<template lang="html">
  <div class="columns is-mobile has-text-centered">
    <div class="column is-3-mobile">
      <strong>{{ headingFromCompass }}</strong>
      <br>
      {{ heading }}
      <translate tag="small" translate-comment="Degree symbol">°</translate>
    </div>
    <div class="column is-offset-3 is-2-mobile">
      <strong>{{ speedMin }}</strong>
      <br>
      <translate tag="small">MIN</translate>
    </div>
    <div class="column is-2-mobile has-highlight">
      <strong>{{ speedAvg }}</strong>
      <br>
      <translate tag="small">AVG</translate>
    </div>
    <div class="column is-2-mobile">
      <strong>{{ speedMax }}</strong>
      <br>
      <translate tag="small">MAX</translate>
    </div>
  </div>
</template>

<script lang="buble">
export default {
  name: 'wind-overview',

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
      type: Number,
      required: true
    },

    speedMax: {
      type: Number,
      required: true
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
  }
}
</script>

<style lang="scss" scoped>
  .columns {
    font-size: 1.1rem;
  }

  small {
    font-weight: 300;
  }

  .has-highlight strong {
    font-size: 1.3rem;
    line-height: .9;
  }
</style>
