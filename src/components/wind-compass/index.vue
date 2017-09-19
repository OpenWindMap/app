<template lang="html">
  <div :class="['has-text-centered', inline ? 'columns is-mobile' : '']">

    <div class="column" v-if="!offline && ((!iconOnly && inline) || (iconOnly && inline && hide))"
      :style="{visibility: iconOnly && hide ? 'hidden' : 'visible'}">
      <strong>{{ speedAvg !== null && speedAvg !== undefined? $getvalue(speedAvg) : '--' }}</strong> <br>
      <small>{{ label || $convert.currentLabel }}</small>
    </div>

    <div class="column" v-if="!offline && (heading !== null && heading !== undefined)">
      <div class="wind-icon">
        <wind-icon :heading="heading" :speed="speed"/>
      </div>
    </div>

    <div class="column" v-if="!offline && ((!iconOnly && !inline) || (iconOnly && !inline && hide))"
      :style="{visibility: iconOnly && hide ? 'hidden' : 'visible'}">
      <strong>{{ speedAvg !== null && speedAvg !== undefined ? $getvalue(speedAvg) : '--' }}</strong> <br>
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

    <div v-if="!offline && (heading === null || heading === undefined)" class="column">
      <span class="icon">
        <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      </span>
    </div>
  </div>
</template>

<script lang="buble">
import windIcon from '@/components/wind-icon'

export default {
  name: 'wind-compass',

  components: { windIcon },

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
      return this.speedAvg
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  .wind-icon {
    height: 3em;
    width: 2em;
    margin: auto;
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
