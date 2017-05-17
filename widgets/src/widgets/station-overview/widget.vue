<script lang="buble">
import Component from '@/components/station-overview'

export default {
  components: { stationOverview: Component },

  props: {
    stationId: {
      type: Number,
      default: 123
    },
    lightStyle: {
      type: Boolean,
      default: false
    }
  },

  render(h) {
    return h('div', {
      class: {
        'pioupiou-widget': true,
        'pioupiou-widget-light': this.lightStyle
      }
    }, [
      h('station-overview', {
        props: {
          station: this.station
        },
        on: {
          open(target) {
            window.open(`http://pioupiou.fr/fr/${target.id}`, '_blank')
          }
        }
      })
    ])
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
  @import '~font-awesome/scss/font-awesome';

  .pioupiou-widget {
    @import '~bulma';

    min-width: 400px;
    min-height: 70px;
    width: 0;
    height: 0;

    color: $text-strong;
    margin: 0;
    padding: 0;

    overflow: auto;

    .card {
      min-height: 95%;
    }

    strong {
      color: $text-strong;
    }

    .card-header .wind-compass {
      min-width: 90px !important;
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

    &.pioupiou-widget-light {
      .card {
        background-color: $white;
        color: $grey-darker;

        strong {
          color: $grey-darker;
        }
      }
    }
  }
</style>
