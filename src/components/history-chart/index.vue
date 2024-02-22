<template>
  <figure class="has-text-centered">
    <!-- <canvas ref="background"></canvas> -->
    <canvas ref="chart" v-show="data !== null && data !== undefined"></canvas>
    <template v-if="data !== null && data === undefined">
      <span class="icon">
        <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      </span>
    </template>
    <template v-if="data === null">
      <span class="icon">
        <translate>No data found</translate>
      </span>
    </template>
  </figure>
</template>

<script lang="buble">
import Vue from 'vue'

export default {
  name: 'history-chart',

  props: ['data', 'currentTime'],

  data() {
    return {
      context: undefined,
      height: 0,
      width: 0,
      defaultMax: 75,
      pxRatio: window.devicePixelRatio || 1,
      marginBottom: 30 * (window.devicePixelRatio || 1),
      marginLeft: 30 * (window.devicePixelRatio || 1)
    }
  },

  computed: {
    stopTime() {
      return this.$store.state.user.currentTime
    },
    startTime() {
      return this.dataSet[0].date.getTime()
    },
    period() {
      return this.stopTime - this.startTime
    },
    timeToPixels() {
      return (this.width - this.marginLeft) / this.period
    },
    speedToPixels() {
      return (this.height - this.marginBottom) / this.$getvalue(this.maxSpeed)
    },
    maxSpeed() {
      return this.dataSet.reduce((max, data) => data.max >= max ? data.max : max, this.defaultMax)
    },
    gradient() {
      if (!this.width || !this.height) return 'white'

      const virtualCanvas = document.createElement('canvas')
      virtualCanvas.width = this.width
      virtualCanvas.height = this.height
      const virtualContext = virtualCanvas.getContext('2d')

      for (let speed = 0; speed <= this.maxSpeed; speed += 5) {
        virtualContext.fillStyle = this.$options.filters.speedToColors(speed)
        virtualContext.fillRect(0, 0, this.width, this.speed2y(speed))
      }

      return this.context.createPattern(virtualCanvas, 'repeat-x')
    },
    dataSet() {
      if (!this.data || !this.data.length) return []
      return this.data.map(data => ({
        lat: data[1],
        lon: data[2],
        avg: data[4],
        min: data[3],
        max: data[5],
        heading: data[6],
        date: new Date(data[0])
      }))
    },
    unit() {
      return Vue.config.unit
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
      this.handleWindowResize()
      this.draw()
    },
    stopTime() {
      this.draw()
    },
    unit() {
      this.draw()
    }
  },

  mounted() {
    this.context = this.$refs.chart.getContext('2d')

    this.handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('orientationchange', this.handleWindowResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('orientationchange', this.handleWindowResize)
  },

  methods: {
    time2x(time) {
      return (((new Date(time)).getTime() - this.startTime) * this.timeToPixels) + this.marginLeft
    },
    speed2y(speed) {
      return (this.height - this.marginBottom) - (this.$getvalue(speed) * this.speedToPixels)
    },
    handleWindowResize() {
      this.$nextTick(() => {
        this.height = this.$refs.chart.clientHeight * this.pxRatio
        this.width = this.$refs.chart.clientWidth * this.pxRatio
      })

      console.log('resize or update')
    },

    draw() {
      this.context.clearRect(0, 0, this.width, this.height)

      // this.context.fillStyle = this.gradient
      // this.context.fillRect(0, 0, this.width, this.height)

      if (this.data === undefined || this.data === null || this.data.length === 0) return

      this.drawDataAmplitude()

      this.drawGrid()

      this.drawDataLine()
    },
    drawDataLine() {

      let X = this.time2x(this.dataSet[0].date)
      let Y = this.speed2y(this.dataSet[0].avg)

      this.context.beginPath()
      this.context.moveTo(X, Y)

      this.dataSet.slice(1).forEach((data, i) => {
        X = this.time2x(data.date)
        Y = this.speed2y(data.avg)
        // this.context.strokeStyle = this.$options.filters.speedToColors(average)
        this.context.lineTo(X, Y)
      })

      this.context.lineWidth = 5 * this.pxRatio
      this.context.strokeStyle = 'rgba(255, 255, 255, 0.5)' //this.gradient
      this.context.stroke()

      this.context.lineWidth = 3 * this.pxRatio
      this.context.strokeStyle = 'rgb(100, 100, 100)' //this.gradient
      this.context.stroke()

      Y = this.height - (12.5 * this.pxRatio)
      let LX = 0 // this.width + this.marginLeft

      this.dataSet.reverse().forEach(data => {
        X = this.time2x(data.date)
        if ((X - LX) < (20 * this.pxRatio)) return
        this.drawArrow(X, Y, data.heading, data.avg)
        LX = X
      })

      // for (let i = 0; i < this.dataSet.length; i++) {
      //   const data = this.dataSet[i]
      //   X = this.time2x(data.date)
      //   if ((LX - X) <= (20 * this.pxRatio)) return
      //   this.drawArrow(X, Y, data.heading, data.avg)
      //   LX = X
      // }
    },
    drawDataAmplitude() {
      this.context.shadowColor = 'rgba(0, 0, 0, 0.2)'
      this.context.shadowBlur = 10
      this.context.fillStyle = 'white'
      this.context.strokeStyle = 'rgba(0, 0, 0, 0.2)'
      this.context.beginPath()
      this.context.moveTo(this.time2x(this.dataSet[0].date), this.speed2y(this.dataSet[0].max))
      for (let i = 1; i < this.dataSet.length; i++) {
        this.context.lineTo(this.time2x(this.dataSet[i].date), this.speed2y(this.dataSet[i].max))
      }
      for (let i = this.dataSet.length -1 ; i >= 0; i--) {
        this.context.lineTo(this.time2x(this.dataSet[i].date), this.speed2y(this.dataSet[i].min))
      }
      // this.context.stroke()
      this.context.fill()

      this.context.shadowColor = 0
      this.context.shadowBlur = 0
      
      for (let i = 1; i < this.dataSet.length; i++) {
        this.context.fillStyle = this.gradient //this.$options.filters.speedToColors((this.dataSet[i-1].avg + this.dataSet[i].avg) / 2)
        this.context.lineWidth = this.pxRatio
        this.context.beginPath()
        this.context.moveTo(this.time2x(this.dataSet[i-1].date), this.speed2y(this.dataSet[i-1].max))
        this.context.lineTo(this.time2x(this.dataSet[i].date) + this.pxRatio , this.speed2y(this.dataSet[i].max))
        this.context.lineTo(this.time2x(this.dataSet[i].date) + this.pxRatio, this.speed2y(this.dataSet[i].min))
        this.context.lineTo(this.time2x(this.dataSet[i-1].date), this.speed2y(this.dataSet[i-1].min))
        this.context.closePath()
        this.context.fill()
      }

      this.dataSet.reverse() // it won't work without this, IDK why
    },
    drawGrid() {
      this.context.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      this.context.fillStyle = 'rgba(0, 0, 0, 0.5)'
      this.context.font = `${10 * this.pxRatio}px Arial`
      this.context.textBaseline = 'bottom'

      this.context.lineWidth = this.pxRatio

      this.context.beginPath()
      this.context.moveTo(0, 0)
      this.context.lineTo(this.width, 0)
      this.context.stroke()

      for (let speed = 0; speed <= this.maxSpeed; speed += 15) {
        const Y = Math.round(this.speed2y(speed))
        this.context.fillText(`${Math.round(this.$getvalue(speed))}`, 3 * this.pxRatio, Y - 2)
        this.context.beginPath()
        this.context.moveTo(0, Y - 0.5)
        this.context.lineTo(this.width, Y - 0.5)
        this.context.stroke()
      }

      const date = new Date(this.startTime)
      date.setMinutes(0)
      date.setSeconds(0)

      this.context.textBaseline = 'top'

      for (let time = date.getTime(); time < this.stopTime; time += 3600000) {
        const hour = (new Date(time)).getHours()
        this.context.fillText(`${hour}:00`, this.time2x(time), 3 * this.pxRatio)
        this.context.beginPath()
        this.context.moveTo(this.time2x(time), 0)
        this.context.lineTo(this.time2x(time), this.height - this.marginBottom)
        this.context.stroke()
      }
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
      this.context.strokeStyle = 'rgba(0, 0, 0, 0.4)'
      this.context.fill()
      this.context.stroke()
      this.context.restore()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  figure, canvas {
    height: 100%;
    width: 100%;
    background-color: white;
  }

  span.icon {
    color: $grey;
    vertical-align: middle;
    height: 100%;
    i.fa {
      font-size: 2.5em;
    }
  }
</style>
