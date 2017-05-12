<script lang="buble">
import Component from '@/components/wind-compass'

export default {
  components: { windCompass: Component },

  props: {
    stationId: {
      type: Number,
      default: 123
    }
  },

  render(createElement) {
    return createElement('wind-compass', {
      props: {
        heading: this.station.measurements.wind_heading,
        speedAvg: this.station.measurements.wind_speed_avg,
        speedMin: this.station.measurements.wind_speed_min,
        speedMax: this.station.measurements.wind_speed_max,
        inline: true,
        offline: this.offline,
        label: 'AVG'
      }
    })
  },

  computed: {
    station() {
      return this.$store.getters['pioupious/get'](this.stationId)
    },
    offline() {
      const now = new Date().getTime()
      return Math.round(now - new Date(this.station.measurements.date).getTime()) >= this.$store.state.pioupious.timeout
    }
  },

  mounted() {
    console.log({ stationId: this.stationId })
    this.$store.dispatch('pioupious/fetchOne', { stationId: this.stationId })
    this.$store.dispatch('pioupious/keepOneUpdated', { stationId: this.stationId })
  }
}
</script>

<style lang="scss">
  @import "~src/assets/vars";
  @import '~bulma';
  @import '~font-awesome/scss/font-awesome';

  html, body {
    overflow: auto;
  }

  .is-fullwidth {
    width: 100%;
  }

  * {
    user-select: none;
    touch-callout: none;
    user-drag: none;
  }

  input {
    user-select: auto !important;
  }
</style>
