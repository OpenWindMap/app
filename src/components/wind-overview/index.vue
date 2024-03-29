<template>
  <div class="columns is-mobile has-text-centered">
    <div class="column is-3-mobile">
      <template v-if="heading !== null && heading !== undefined">
        <strong>{{ headingFromCompass }}</strong>
        <br>
        {{ heading }}°
      </template>
      <template v-else>
        <span class="icon" v-if="!offline">
          <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </span>
        <span class="icon" v-else>
          <i class="fa fa-ban"></i>
        </span>
      </template>
    </div>
    <div :class="['column is-2-mobile speed', offset ? `is-offset-${ offset }` : `` ]">
      <strong :style="{ color: this.$options.filters.speedToColors2(speedMin) }">
        {{ speedMin !== null && speedMin !== undefined ? $getvalue(speedMin) : '--' }}</strong>
      <br>
      <translate tag="small">min</translate>
    </div>
    <div class="column is-2-mobile speed has-highlight">
      <strong :style="{ color: this.$options.filters.speedToColors2(speedAvg) }">
        {{ speedAvg !== null && speedAvg !== undefined ? $getvalue(speedAvg) : '--' }}</strong>
      <br>
      <small>{{ $convert.currentLabel }}</small>
    </div>
    <div class="column is-2-mobile speed">
      <strong :style="{ color: this.$options.filters.speedToColors2(speedMax) }">
        {{ speedMax !== null && speedMax !== undefined ? $getvalue(speedMax) : '--' }}</strong>
      <br>
      <translate tag="small">max</translate>
    </div>
  </div>
</template>

<script lang="buble">
export default {
  name: 'wind-overview',

  props: {
    heading: {
      type: Number,
      default: null
    },

    speedAvg: {
      type: Number,
      default: null
    },

    speedMin: {
      type: Number,
      default: null
    },

    speedMax: {
      type: Number,
      default: null
    },

    offset: {
      type: [Boolean, Number],
      default: 3
    },

    offline: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    headingFromCompass() {
      const compass = [
        this.$pgettext('Cardinal direction abbreviation', 'N'),
        this.$pgettext('Cardinal direction abbreviation', 'NNE'),
        this.$pgettext('Cardinal direction abbreviation', 'NE'),
        this.$pgettext('Cardinal direction abbreviation', 'ENE'),
        this.$pgettext('Cardinal direction abbreviation', 'E'),
        this.$pgettext('Cardinal direction abbreviation', 'ESE'),
        this.$pgettext('Cardinal direction abbreviation', 'SE'),
        this.$pgettext('Cardinal direction abbreviation', 'SSE'),
        this.$pgettext('Cardinal direction abbreviation', 'S'),
        this.$pgettext('Cardinal direction abbreviation', 'SSW'),
        this.$pgettext('Cardinal direction abbreviation', 'SW'),
        this.$pgettext('Cardinal direction abbreviation', 'WSW'),
        this.$pgettext('Cardinal direction abbreviation', 'W'),
        this.$pgettext('Cardinal direction abbreviation', 'WNW'),
        this.$pgettext('Cardinal direction abbreviation', 'NW'),
        this.$pgettext('Cardinal direction abbreviation', 'NNW'),
        this.$pgettext('Cardinal direction abbreviation', 'N')
      ]

      return compass[Math.round(this.heading / (360 / 16))]
    }
  },

  updated() {
    console.log('updated Wind')
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  .columns {
    font-size: 1.1em;
  }

  small {
    font-weight: 300;
  }

  .has-highlight strong {
    font-size: 1.3em;
    line-height: .9;
  }

  span.icon {
    color: $grey;
    vertical-align: middle;
    height: 100%;
    i.fa {
      font-size: 2em;
    }
  }

  .speed > strong{
    text-shadow: -0.5px -0.5px 0 #aaa, 0.5px -0.5px 0 #aaa, -0.5px 0.5px 0 #aaa, 0.5px 0.5px 0 #aaa;
  }
</style>
