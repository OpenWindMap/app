<template lang="html">
  <div class="is-fullwidth has-text-centered title is-3">
    <div class="wind-icon" :style="windIconStyle"></div>
    <small>{{ speed }} {{ unit }}</small>
  </div>
</template>

<script lang="buble">
export default {
  name: 'wind-compass',

  props: {
    heading: {
      type: Number,
      required: true
    },

    speed: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      'unit': 'Km/h'
    }
  },

  computed: {
    windIconStyle() {
      let colorIndex = Math.floor(this.speed / 5)
      colorIndex = (colorIndex > 15) ? 15 : colorIndex
      const shift = -colorIndex * 80

      const rotate = this.heading

      return {
        'background-position': `${shift}px 0px`,
        transform: `rotate(${rotate}deg)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wind-icon {
    background-image: url("~static/img/compass-wind-icon.png");
    height: 144px;
    width: 69px;
    margin: auto;
  }
</style>
