<template lang="html">
  <div :class="['has-text-centered', inline ? 'columns is-mobile' : '']">

    <div class="column" v-if="!iconOnly && inline">
      <strong>{{ speedAvg || speedMax || speedMin }}</strong> <br>
      <small>{{ label || unit }}</small>
    </div>

    <div class="column">
      <div class="wind-icon" :style="windIconStyle"></div>
    </div>

    <div class="column" v-if="!iconOnly && !inline">
      <strong>{{ speedAvg || speedMax || speedMin }}</strong>
      <small>{{ label || unit }}</small>
    </div>
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

    speedAvg: {
      type: Number,
      required: true
    },

    speedMin: {
      type: Number
    },

    speedMax: {
      type: Number,
      required: true
    },

    inline: {
      type: Boolean,
      default: false
    },

    iconOnly: {
      type: Boolean,
      default: false
    },

    label: {
      type: String
    }
  },

  data() {
    return {
      unit: 'Km/h'
    }
  },

  computed: {
    speed() {
      return this.speedMax || this.speedAvg
    },
    windIconStyle() {
      let colorIndex = Math.floor(this.speed / 5)
      colorIndex = (colorIndex > 15) ? 15 : colorIndex
      const shift = -colorIndex * 2.38

      const rotate = this.heading

      return {
        'background-position': `${shift}em 0px`,
        transform: `rotate(${rotate}deg)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wind-icon {
    background-image: url("~static/img/compass-wind-icon.png");
    height: 3em;
    width: 2em;
    margin: auto;
    background-size: 38em 3em;
  }

  .columns.is-mobile {
    align-items: center;
  }

  small {
    font-weight: 300;
    font-size: 1.1em;
  }

  strong {
    font-size: 1.3em;
    line-height: .9;
  }
</style>
