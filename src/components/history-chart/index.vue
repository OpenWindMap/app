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
    marginBottom() {
      return this.height * 0.05
    },
    timeToPixels() {
      return this.width / this.period
    },
    speedToPixels() {
      return (this.height - this.marginBottom) / this.maxSpeed
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
      return (this.height - this.marginBottom) - (speed * this.speedToPixels)
    },
    handleWindowResize() {
      this.height = this.$refs.chart.clientHeight
      this.width = this.$refs.chart.clientWidth
    },

    draw() {
      if (this.data.length === 0) return

      this.context.fillStyle = 'rgba(66, 139, 202, 0.5)'
      this.context.strokeStyle = 'rgba(255, 255, 255, 0.7)'
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

      this.context.beginPath()

      this.context.moveTo(this.time2x(this.dataSet[0].date), this.speed2y(this.dataSet[0].avg))

      this.dataSet.slice(1).forEach(data => {
        this.context.lineTo(this.time2x(data.date), this.speed2y(data.avg))
      })

      this.context.stroke()
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
