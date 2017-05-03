<template lang="html">
  <div class="map-legend">
    <canvas ref="legend"></canvas>
  </div>
</template>

<script lang="buble">
  import Vue from 'vue'
  import { palette as Palette } from '@/filters/speedToColors'

  export default {
    name: 'map-legend',

    props: [],

    data() {
      return {
        context: undefined,
        height: 0,
        width: 0,
        pxRatio: window.devicePixelRatio || 1
      }
    },

    computed: {
      currentUnit() {
        return Vue.config.unit
      }
    },

    watch: {
      height() {
        if (this.$refs.legend) {
          this.$refs.legend.height = this.height
        }
        this.draw()
      },
      width() {
        if (this.$refs.legend) {
          this.$refs.legend.width = this.width
        }
        this.draw()
      },
      currentUnit() {
        this.draw()
      }
    },

    mounted() {
      this.context = this.$refs.legend.getContext('2d')
      this.handleWindowResize()
      window.addEventListener('resize', this.handleWindowResize)
      window.addEventListener('orientationchange', this.handleWindowResize)
      //  this.draw()
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.handleWindowResize)
      window.addEventListener('orientationchange', this.handleWindowResize)
    },

    methods: {
      handleWindowResize() {
        this.height = this.$refs.legend.clientHeight * this.pxRatio
        this.width = this.$refs.legend.clientWidth * this.pxRatio
      },
      draw() {
        const ctx = this.context
        const w = this.width
        const h = this.height
        const paddingTop = 0
        const paddingBottom = 0
        const freeHeight = h - paddingTop - paddingBottom
        const colorHeight = freeHeight / Palette.length
        const colorWidth = w

        ctx.clearRect(0, 0, this.width, this.height)

        Palette.forEach((color, index) => {
          ctx.fillStyle = color
          ctx.shadowBlur = 0
          ctx.fillRect(w - colorWidth, paddingTop + ((Palette.length - index - 1) * colorHeight), colorWidth, colorHeight)

          ctx.fillStyle = 'hsl(216, 57%, 31%)'
          ctx.strokeStyle = 'white'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.font = `${12 * this.pxRatio}px Arial`
          ctx.fillText(this.$getvalue(index * 5), colorWidth / 2, ((Palette.length - index) * colorHeight) - (8 * this.pxRatio))
          // ctx.font = `${12 * this.pxRatio}px Arial`
          // ctx.strokeText(this.$getvalue(index * 5), colorWidth / 2, ((Palette.length - index) * colorHeight) - (8 * this.pxRatio))
        })

        // ctx.lineWidth = this.pxRatio
        // ctx.strokeRect(w - colorWidth, paddingTop, colorWidth, freeHeight)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .map-legend {
    display: block;
    z-index: 999;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    width: 18px;
    pointer-events: none;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
