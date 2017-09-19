<template lang="html">
  <div class="icon-container">
    <svg width="26.5" height="28" :style="`position: absolute; left: -13.25px; transform: rotate(${heading}deg); -webkit-transform: rotate(${heading}deg)`">
      <defs>
        <filter id="blur">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <polygon stroke="black" stroke-width="0.5" strock-linecap="round" filter="url(#blur)"
        points="3.75,4 13.25,8 22.75,4 13.25,24" :fill="this.$options.filters.speedToColors(speed)" />
    </svg>
    <svg width="10px" height="10px" :style="`position: absolute; left: -5px; top: -5px; transform: rotate(-${heading}deg); -webkit-transform: rotate(-${heading}deg)`">
      <g fill="#222">
      </g>
    </svg>
  </div>
</template>

<script lang="buble">
export default {
  name: 'wind-icon',

  props: {
    heading: {
      type: Number,
      required: true
    },

    speed: {
      type: Number,
      required: true
    },

    type: {
      type: Number
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .icon-container {
    height: 100%;
    width: 100%;
    position: absolute;
  }
</style>
