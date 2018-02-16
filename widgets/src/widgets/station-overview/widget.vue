<script lang="buble">
import Component from '@/components/station-overview'

export default {
  components: { stationOverview: Component },

  props: {
    stationId: {
      type: Number,
      default: 123
    },
    unit: {
      type: String,
      default: 'kpmh'
    }
  },

  render(h) {
    return h('div', {
      class: {
        'pioupiou-station-overview': true,
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
      }),
      h('img', {
        class: 'watermark',
        attrs: {
          src: 'http://pioupiou.fr/img/pioupiou-logo.svg',
          alt: 'Pioupiou logo'
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
    console.warn({ stationId: this.stationId, unit: this.unit })
    // this.$store.dispatch('user/setUnit', { unit: 'knots' })
    this.$store.dispatch('pioupious/fetchOne', { stationId: this.stationId })
    this.$store.dispatch('pioupious/keepOneUpdated', { stationId: this.stationId })
  }
}
</script>

<style lang="scss">
  @import "~src/assets/vars";
  @import '~font-awesome/scss/font-awesome';

  .pioupiou-widget:not(:last-of-type) {
    &.pioupiou-station-overview {
      min-height: 124px;
    }
    .watermark {
      display: none;
    }
  }

  .pioupiou-widget.pioupiou-station-overview {
    @import '~bulma';

    min-width: 400px;
    min-height: 159px;
    overflow: hidden;
    width: 0;
    height: 0;

    position: relative;

    color: $text-strong;
    margin: 0;
    padding: 0;
    background-color: $body-background;
    outline: 1px solid $grey-darker;

    .card {
      background-color: $body-background;
      color: $text-strong;

      .card-content {
        box-shadow: initial;
      }

      strong {
        color: $text-strong;
      }
      .card-header .wind-compass {
        min-width: 90px !important;
      }
    }

    .watermark {
      height: 25px;
      padding: 5px 15px;
      float: right;
      position: absolute;
      bottom: 0;
      right: 0;
      filter: brightness(0) grayscale(1) invert(1);
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
      &, .card, .card-content {
        background-color: $white;
        color: $grey-darker;

        strong {
          color: $grey-darker;
        }
      }
      outline: 1px solid $white;
      .watermark {
        filter: none;
      }
    }
  }
</style>
