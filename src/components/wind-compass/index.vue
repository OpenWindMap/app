<template lang="html">
  <div :class="['has-text-centered', inline ? 'columns is-mobile' : '']">

    <div class="column" v-if="!offline && ((!iconOnly && inline) || (iconOnly && inline && hide))"
      :style="{visibility: iconOnly && hide ? 'hidden' : 'visible'}">
      <strong>{{ $getvalue(speedAvg) }}</strong> <br>
      <small>{{ label || $convert.currentLabel }}</small>
    </div>

    <div class="column" v-if="!offline">
      <div class="wind-icon" :style="windIconStyle"></div>
    </div>

    <div class="column" v-if="!offline && ((!iconOnly && !inline) || (iconOnly && !inline && hide))"
      :style="{visibility: iconOnly && hide ? 'hidden' : 'visible'}">
      <strong>{{ $getvalue(speedAvg) }}</strong> <br>
      <small>{{ label || $convert.currentLabel }}</small>
    </div>

    <div class="column" v-if="offline && ((!iconOnly && inline) || (iconOnly && inline && hide))"
      :style="{visibility: iconOnly && hide ? 'hidden' : 'visible'}">
      <strong>--</strong> <br>
      <small>{{ label || $convert.currentLabel }}</small>
    </div>
    <div v-if="offline" class="column">
      <span class="icon">
        <i class="fa fa-ban"></i>
      </span>
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

    hide: {
      type: Boolean,
      default: false
    },

    label: {
      type: String
    },

    offline: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
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
  @import "~src/assets/vars";

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

  span.icon {
    color: $grey;
  }
</style>
