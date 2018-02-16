<script lang="buble">
import Component from '@/components/map-content'

export default {
  components: { mapContent: Component },

  props: {
    stationId: {
      type: Number,
      default: 123
    }
  },

  render(h) {
    return h('div', {
      class: {
        'pioupiou-map-content': true,
        'pioupiou-widget': true,
        'pioupiou-widget-light': this.lightStyle
      }
    }, [
      this.station.location === undefined ? null : h('map-content', {
        props: {
          zoom: 14,
          mapMarkers: this.stationMarkers,
          autoCenter: 'marker'
        },
        on: {
          markerClick(target) {
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
    },
    stationMarkers() {
      return [this.station]
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

  .pioupiou-widget:not(:last-of-type) {
    &.pioupiou-map-content {
      #map {
        height: 100%;
      }
    }
    .watermark {
      display: none;
    }
  }

  .pioupiou-widget.pioupiou-map-content {
    @import '~bulma';

    min-width: 400px;
    min-height: 180px;
    width: 0;
    height: 0;

    position: relative;

    background-color: $body-background;
    outline: 1px solid $grey-darker;
    color: $text-strong;
    margin: 0;
    padding: 0;
    outline: 1px solid $grey-darker;

    overflow: hidden;

    #map {
      height: 80%;
    }

    .watermark {
      height: 25px;
      padding: 5px 15px;
      float: right;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 9999;
    }

    strong {
      color: $text-strong;
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
      background-color: $white;
      color: $grey-darker;
      outline: 1px solid $white;

      .watermark {
        filter: none;
      }
    }
  }
</style>
