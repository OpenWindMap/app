<template lang="html">
  <section>
    <div class="columns">
      <div class="column">
        <div class="card" style="box-shadow: initial;">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left title is-5">
                <strong>{{ pioupiou.meta && pioupiou.meta.name || $gettext('Unnamed Pioupiou') }}</strong> <br>
                <small>#{{ pioupiou.id || id}}</small>
                <small v-if="pioupiou.location">
                  |
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
                <small class="location-placeholder" v-else></small>
              </div>
              <div class="is-pulled-right">
                <a @click="favMe" class="is-warning title is-3">
                  <i :class="['fa', faved ? 'fa-star is-warning' : 'fa-star-o is-info']"></i>
                </a>
              </div>
            </div>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="">
                <div class="column">
                  <map-content v-if="pioupiou.measurements && pioupiou.location"
                    :zoom="14" :map-markers="pioupiouMarkers" :auto-center="'marker'"></map-content>
                  <div class="map-placeholder" v-else></div>
                  <map-content v-else :zoom="14"></map-content>

                  <small v-if="!offline && pioupiou.measurements" class="tag is-medium">
                    {{ dataOld }}
                  </small>
                  <translate tag="small" class="tag is-medium is-danger" v-else>
                    offline
                  </translate>

                  <wind-overview v-if="!offline && pioupiou.measurements"
                    :heading="pioupiou.measurements.wind_heading"
                    :speed-min="pioupiou.measurements.wind_speed_min"
                    :speed-avg="pioupiou.measurements.wind_speed_avg"
                    :speed-max="pioupiou.measurements.wind_speed_max">
                  </wind-overview>
                  <wind-overview :offline="offline" v-else></wind-overview>

                  <div class="overview-placeholder" v-else></div>
                </div>

                <div class="column">
                  <keep-alive>
                    <history-chart :data="pioupiou.archive" style="height: 150px;"></history-chart>
                  </keep-alive>
                </div>

                <div class="column">
                  <article class="message" v-if="pioupiou.meta">
                    <div class="message-body" v-html="description || 'No descrition provided'">
                    </div>
                    <div class="message-body pull-right">
                      <small><a :href="'https://pioupiou.fr/' + pioupiou.id + '/edit?fromApp'" target="_blank" class="no-decoration"><span class="icon"><i class="fa fa-pencil-square-o"></i></span></a></small>
                    </div>
                  </article>
                  <article class="message" v-else>
                    <div class="message-body">
                      No descrition provided
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

  props: {
    id: {
      Type: Number,
      default: 0
    }
  },

  components: { windOverview, mapContent, historyChart },

  data() {
    return {
      data: [],
      dataOld: undefined
    }
  },

  computed: {
    pioupiou() {
      return this.$store.getters['pioupious/get'](this.id)
    },
    pioupiouMarkers() {
      return [this.pioupiou]
    },
    faved() {
      return this.$store.state.user.favorites.indexOf(this.id) !== -1
    },
    currentTime() {
      return this.$store.state.user.currentTime
    },
    description() {
      return this.$options.filters.linkify(this.pioupiou.meta.description || '')
    },
    offline() {
      const now = new Date().getTime()
      return this.pioupiou.measurements && Math.round(now - new Date(this.pioupiou.measurements.date).getTime()) >= this.$store.state.pioupious.timeout
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

  watch: {
    currentTime() {
      const nTime = this.$options.filters.timeago(this.pioupiou.measurements.date, this.currentTime)
      if (nTime !== this.dataOld) {
        this.dataOld = nTime
      }
    }
  },

  activated() {
    this.$store.dispatch('pioupious/fetchOne', { stationId: this.id })
    this.$store.dispatch('pioupious/keepOneUpdated', { stationId: this.id })

    this.$store.dispatch('user/pushToHistories', { stationId: this.id })
  },

  deactivated() {
    this.$store.dispatch('pioupious/stopOneToBeUpdated', { stationId: this.id })
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  .card {
    .card-header {
      padding: 12px 12px 0.75em;
      box-shadow: initial;

      .title {
        margin-bottom: 0;
      }

      .is-pulled-left {
        max-width: 80vw;
      }

      .is-pulled-right {
        line-height: 1.8em;
      }

      .subtitle.is-5 {
        font-size: 1.23em;
      }
    }

    .card-content {
      padding: 0;

      .content > .columns > .column:last-child {
        padding: 0;
      }

      .tag.is-medium {
        margin: 0 0.75em;
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
      padding: 0 0 0.75rem 0;
    }

    &.is-mobile {
      padding: 0 0.75em;

      .column {
        padding: 0.25em;
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
    box-shadow: inset 2px 0px 8px rgba(10, 10, 10, 0.1), inset -2px 0px 8px rgba(10, 10, 10, 0.1);
    background: $dark;
    padding-bottom: 4em;

    .message-body {
      border-radius: initial;
      border: initial;
    }
  }

  .map-placeholder {
    height: 180px;
    width: 100%;
    background-color: $light;
  }

  .location-placeholder {
    background-color: $body-background;
    width: 160px;
    display: inline-block;
    height: 0.8em;
  }

  .overview-placeholder {
    background-color: $body-background;
    height: 100px;
    width: 100%;
  }
  .no-decoration {
    text-decoration: none;
  }
</style>
