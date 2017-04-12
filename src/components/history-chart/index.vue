<template lang="html">
  <figure>
    <!-- <canvas ref="background"></canvas> -->
    <canvas ref="chart"></canvas>
  </figure>
</template>

<script lang="buble">
export default {
  name: 'history-chart',

  props: ['data'],

  data() {
    return {
      context: undefined,
      stopTime: new Date().getTime(),
      height: 0,
      width: 0,
      pxRatio: window.devicePixelRatio || 1
    }
  },

  computed: {
    startTime() {
      return this.dataSet[0].date.getTime()
    },
    period() {
      return this.stopTime - this.startTime
    },
    margin() {
      return this.height * 0.10
    },
    timeToPixels() {
      return this.width / this.period
    },
    speedToPixels() {
      return (this.height - this.margin) / this.maxSpeed
    },
    maxSpeed() {
      return this.dataSet.reduce((max, data) => data.max >= max ? data.max : max, 0)
    },
    dataSet() {
      return this.data.map(data => ({
        lat: data[1],
        lon: data[2],
        avg: data[4],
        min: data[3],
        max: data[5],
        heading: data[6],
        date: new Date(data[0])
      }))
    }
  },

  watch: {
    height() {
      if (this.$refs.chart) {
        this.$refs.chart.height = this.height
      }
      this.draw()
    },
    width() {
      if (this.$refs.chart) {
        this.$refs.chart.width = this.width
      }
      this.draw()
    },
    data() {
      this.draw()
    }
  },

  mounted() {
    this.context = this.$refs.chart.getContext('2d')

    this.height = this.$refs.chart.clientHeight * this.pxRatio
    this.width = this.$refs.chart.clientWidth * this.pxRatio

    console.log(this.height, this.width)

    window.addEventListener('resize', this.handleWindowResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    time2x(time) {
      return ((new Date(time)).getTime() - this.startTime) * this.timeToPixels
    },
    speed2y(speed) {
      return (this.height - this.margin) - (speed * this.speedToPixels)
    },
    handleWindowResize() {
      this.height = this.$refs.chart.clientHeight
      this.width = this.$refs.chart.clientWidth
    },

    draw() {
      this.context.clearRect(0, 0, this.width, this.height)

      if (this.data.length === 0) return

      this.context.fillStyle = 'rgb(240, 240, 240)'
      this.context.lineWidth = 2 * this.pxRatio

      this.context.beginPath()

      this.context.moveTo(this.time2x(this.dataSet[0].date), this.speed2y(this.dataSet[0].max))

      this.dataSet.slice(1).forEach(data => {
        this.context.lineTo(this.time2x(data.date), this.speed2y(data.max))
      })

      this.dataSet.reverse().forEach(data => {
        this.context.lineTo(this.time2x(data.date), this.speed2y(data.min))
      })

      this.context.fill()

      let X = this.time2x(this.dataSet[0].date)
      let Y = this.speed2y(this.dataSet[0].avg)

      this.dataSet.slice(1).forEach(data => {
        this.context.beginPath()
        this.context.moveTo(X, Y)
        X = this.time2x(data.date)
        Y = this.speed2y(data.avg)
        this.context.strokeStyle = this.$options.filters.speedToColors(data.avg)
        this.context.lineTo(X, Y)
        this.context.stroke()
      })

      Y = this.height - this.margin
      let LX = 0

      this.dataSet.reverse().forEach(data => {
        X = this.time2x(data.date)
        if ((X - LX) < (20 * this.pxRatio)) return
        this.drawArrow(X, Y, data.heading, data.avg)
        LX = X
      })
    },
    drawArrow(x, y, heading, speed) {
      this.context.save()
      this.context.translate(x, y)
      this.context.rotate(((heading + 180) / 180) * Math.PI)
      this.context.beginPath()
      this.context.moveTo(0 * this.pxRatio, -9 * this.pxRatio)
      this.context.lineTo(5 * this.pxRatio, 9 * this.pxRatio)
      this.context.lineTo(0 * this.pxRatio, 5 * this.pxRatio)
      this.context.lineTo(-5 * this.pxRatio, 9 * this.pxRatio)
      this.context.closePath()
      this.context.lineWidth = this.pxRatio
      this.context.fillStyle = this.$options.filters.speedToColors(speed)
      this.context.strokeStyle = 'rgb(74, 74, 74)'
      this.context.fill()
      this.context.stroke()
      this.context.restore()
    }
  }
}
</script>

<style lang="scss">
  figure, canvas {
    height: 100%;
    width: 100%;
  }
</style>
