<template lang="html">
  <section>
    <div class="columns">
      <div class="column">
        <h5 class="subtitle is-5">Favorites Spots</h5>

        <div class="card" v-for="pioupiou in pioupious" v-if="pioupiou.id" :key="pioupiou.id">
          <header class="card-header" @click="open(pioupiou)">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <strong>{{ pioupiou.meta && pioupiou.meta.name || `${ $gettext('Unnamed Pioupiou') }` }}</strong> <br>
                <small>#{{ pioupiou.id }}</small>
                <!-- <small v-if="pioupiou.location">
                  {{ Math.abs(pioupiou.location.latitude) }}
                  {{ pioupiou.location.latitude > 0 ?
                    $pgettext('Cardinal direction abbreviation', 'N') :
                    $pgettext('Cardinal direction abbreviation', 'S') }}
                  ,
                  {{ Math.abs(pioupiou.location.longitude) }}
                  {{ pioupiou.location.longitude > 0 ?
                    $pgettext('Cardinal direction abbreviation', 'E') :
                    $pgettext('Cardinal direction abbreviation', 'W') }}
                </small> -->
              </div>
              <div class="is-pulled-right">
                <wind-compass class="wind-compass" v-if="pioupiou.measurements"
                  :inline="true" :icon-only="opened === pioupiou.id"
                  :heading="pioupiou.measurements.wind_heading"
                  :speed-min="pioupiou.measurements.wind_speed_min"
                  :speed-avg="pioupiou.measurements.wind_speed_avg"
                  :speed-max="pioupiou.measurements.wind_speed_max">
                </wind-compass>
              </div>
            </div>
          </header>
          <div class="card-content" v-show="opened === pioupiou.id" @click="show(pioupiou)">
            <div class="content">
              <hr>
              <wind-overview v-if="pioupiou.measurements"
                :heading="pioupiou.measurements.wind_heading"
                :speed-min="pioupiou.measurements.wind_speed_min"
                :speed-avg="pioupiou.measurements.wind_speed_avg"
                :speed-max="pioupiou.measurements.wind_speed_max">
              </wind-overview>
              <history-chart></history-chart>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="buble">
import windCompass from '@/components/wind-compass'
import windOverview from '@/components/wind-overview'
import historyChart from '@/components/history-chart'

export default {
  name: 'home-view',

  components: { windCompass, windOverview, historyChart },

  data() {
    return {
      pioupiousIds: [542, 293, 438, 265],
      opened: undefined
    }
  },

  computed: {
    pioupious() {
      return this.pioupiousIds.map(
        id => this.$store.getters['pioupious/get'](id)
      )
    }
  },

  mounted() {
    this.pioupiousIds.forEach(
      id => this.$store.dispatch('pioupious/fetchOne', { stationId: id })
    )
  },

  methods: {
    open(pioupiou) {
      this.opened = this.opened === pioupiou.id ? undefined : pioupiou.id
    },
    show(pioupiou) {
      this.$router.push({ name: 'details', params: { id: pioupiou.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .columns {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;

    .column {
      padding: 0.75rem 0;
    }

    &:last-child {
      margin-bottom: initial;
    }
  }

  .subtitle {
    padding: 12px 12px 0px;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .card {
    cursor: pointer;

    .card-header {
      padding: 12px 12px 0px;
      box-shadow: initial;

      .title {
        margin-bottom: 0;
      }

      .is-pulled-right {
        line-height: 1.8rem;
      }

      .subtitle.is-5 {
        font-size: 1.23rem;
      }
    }

    .card-content {
      padding: 0;
      box-shadow: inset 0px 2px 8px rgba(10, 10, 10, 0.1), inset 0px -2px 8px rgba(10, 10, 10, 0.1);
      background: #fefefe;

      .content > .columns > .column:last-child {
        padding: 0;
      }

      hr {
        margin: 0.25rem 0;
      }
    }
  }

  .wind-compass {
    font-size: 0.7em;
    padding: 0;
    line-height: .9;
  }

  .card-content .content {
    font-size: 0.8em;
    padding: 0;
  }
</style>
