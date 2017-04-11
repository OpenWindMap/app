<template lang="html">
  <section>
    <div class="columns">
      <div class="column">
        <div class="card" style="box-shadow: initial;">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left title is-5">
                <strong>{{ pioupiou.meta && pioupiou.meta.name || $gettext('Unnamed Pioupiou') }}</strong> <br>
                <small>#{{ pioupiou.id }}</small> &mdash;
                <small v-if="pioupiou.location">
                  {{ Math.abs(pioupiou.location.latitude) }}
                  {{ pioupiou.location.latitude > 0 ?
                    $pgettext('Cardinal direction abbreviation', 'N') :
                    $pgettext('Cardinal direction abbreviation', 'S') }}
                  ,
                  {{ Math.abs(pioupiou.location.longitude) }}
                  {{ pioupiou.location.longitude > 0 ?
                    $pgettext('Cardinal direction abbreviation', 'E') :
                    $pgettext('Cardinal direction abbreviation', 'W') }}
                </small>
              </div>
              <div class="is-pulled-right">
                <a @click="favMe" class="is-warning title is-3">
                  <i :class="['fa', faved ? 'fa-star' : 'fa-star-o']"></i>
                </a>
              </div>
            </div>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column">
                  <map-content v-if="pioupiou.measurements && pioupiou.location"
                    :zoom="14" :map-markers="[pioupiou]" auto-center="marker"></map-content>

                  <span class="tag is-medium" v-if="pioupiou.measurements">
                    {{ pioupiou.measurements.date | timeago(now) }}
                  </span>

                  <wind-overview v-if="pioupiou.measurements"
                    :heading="pioupiou.measurements.wind_heading"
                    :speed-min="pioupiou.measurements.wind_speed_min"
                    :speed-avg="pioupiou.measurements.wind_speed_avg"
                    :speed-max="pioupiou.measurements.wind_speed_max">
                  </wind-overview>
                </div>

                <div class="is-hidden-desktop">
                  <hr>
                </div>

                <div class="column">
                  <history-chart></history-chart>
                </div>

                <div class="column">
                  <article class="message" v-if="pioupiou.meta">
                    <div class="message-body" v-html="$options.filters.linkify(pioupiou.meta.description || '')">
                    </div>
                  </article>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="buble">
import mapContent from '@/components/map-content'
import windOverview from '@/components/wind-overview'
import historyChart from '@/components/history-chart'

export default {
  name: 'details-view',

  props: ['id'],

  components: { windOverview, mapContent, historyChart },

  data() {
    return {
      now: (new Date()).getTime()
    }
  },

  computed: {
    pioupiou() {
      return this.$store.getters['pioupious/get'](this.id)
    },
    faved() {
      return this.$store.state.user.favorites.indexOf(this.id) !== -1
    }
  },

  methods: {
    favMe() {
      if (this.faved) {
        this.$store.dispatch('user/removeToFavorites', { stationId: this.id })
      } else {
        this.$store.dispatch('user/pushToFavorites', { stationId: this.id })
      }
    }
  },

  mounted() {
    this.$store.dispatch('user/restoreStore')

    this.$store.dispatch('pioupious/fetchOne', { stationId: this.id })
    this.$store.dispatch('pioupious/keepOneUpdated', { stationId: this.id })

    this.$store.dispatch('user/pushToHistories', { stationId: this.id })

    setInterval(() => {
      this.now = (new Date()).getTime()
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>

  .card {
    .card-header {
      padding: 12px 12px 0px;
      box-shadow: initial;

      .title {
        margin-bottom: 0;
      }

      .is-pulled-left {
        max-width: 80vw;
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

      .content > .columns > .column:last-child {
        padding: 0;
      }

      .tag.is-medium {
        margin: 0 0.75rem;
        font-size: 0.9em;
        background-color: transparent;
      }
    }
  }

  .columns {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;

    .column {
      padding: 0.75rem 0;
    }

    &.is-mobile {
      padding: 0 0.75rem;

      .column {
        padding: 0.25rem;
      }
    }
  }

  #map {
    height: 180px;
  }

  hr {
    margin: 0.25rem 0;
  }

  article.message {
    background-color: #fcfcfc;

    .message-body {
      border-radius: initial;
    }
  }
</style>
