<template>
  <div class="card">
    <header class="card-header" @click="open(station)">
      <div class="is-clearfix is-fullwidth">
        <div class="is-pulled-left">
          <strong>{{ name || `${ $gettext('Unnamed station') }` }}</strong> <br>
          <small>{{ station.id }}</small>
          <template v-if="!offlineMode">
            ·
            <small v-if="!offline && station.measurements">
              {{ station.measurements.date | timeago(currentTime) }}
            </small>
            <translate tag="small" class="is-danger" v-else>
              offline
            </translate>
            <!-- <small v-if="station.location">
              {{ Math.abs(station.location.latitude) }}
              {{ station.location.latitude > 0 ?
                $pgettext('Cardinal direction abbreviation', 'N') :
                $pgettext('Cardinal direction abbreviation', 'S') }}
              ,
              {{ Math.abs(station.location.longitude) }}
              {{ station.location.longitude > 0 ?
                $pgettext('Cardinal direction abbreviation', 'E') :
                $pgettext('Cardinal direction abbreviation', 'W') }}
            </small> -->
          </template>
        </div>
        <div class="is-pulled-right">
          <template>
            <wind-compass class="wind-compass" v-if="station.measurements" :offline="offline"
              :inline="true" :icon-only="opened" :hide="opened"
              :heading="station.measurements.wind_heading"
              :speed-min="station.measurements.wind_speed_min"
              :speed-avg="station.measurements.wind_speed_avg"
              :speed-max="station.measurements.wind_speed_max">
            </wind-compass>
            <!--  :label="$gettext('avg')" -->
            <wind-compass class="wind-compass" v-else></wind-compass>
          </template>
        </div>
      </div>
    </header>
    <div class="card-content" v-if="opened" @click="show(station)">
      <div class="content">
        <hr>
        <keep-alive>
          <wind-overview v-if="station.measurements && !offline"
            :heading="station.measurements.wind_heading || 0"
            :speed-min="station.measurements.wind_speed_min || 0"
            :speed-avg="station.measurements.wind_speed_avg || 0"
            :speed-max="station.measurements.wind_speed_max || 0">
          </wind-overview>
        </keep-alive>
        <keep-alive>
          <history-chart :data="data" style="height: 85px;"></history-chart>
        </keep-alive>
        <br>
      </div>
    </div>
  </div>
</template>

<script lang="buble">
import windCompass from '@/components/wind-compass/index.vue'
import windOverview from '@/components/wind-overview/index.vue'
import historyChart from '@/components/history-chart/index.vue'

export default {
  name: 'station-overview',

  components: { windCompass, windOverview, historyChart },

  props: {
    station: {
      Type: Object,
      required: true
    },

    opened: {
      type: Boolean,
      default: true
    },

    offlineMode: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    open(pioupiou) {
      this.$emit('open', pioupiou)
    },
    show(pioupiou) {
      this.$emit('show', pioupiou)
    }
  },

  data() {
    return {
      data: []
    }
  },

  computed: {
    offline() {
      const now = new Date().getTime()
      return Math.round(now - new Date(this.station.measurements.date).getTime()) >= this.$store.state.pioupious.timeout
    },
    currentTime() {
      return this.$store.state.user.currentTime
    },
    name() {
      return this.$store.state.user.renames[this.station.id] || (this.station.name)
    }
  },

  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "~src/assets/vars";

.card {
  cursor: pointer;
  box-shadow: initial;
  border-top: 1px solid rgba(10, 10, 10, 0.1);

  &:last-child {
    border-bottom: 1px solid rgba(10, 10, 10, 0.1);
  }

  .card-header {
    padding: 12px 12px 0px;
    box-shadow: initial;

    .title {
      margin-bottom: 0;
    }

    .is-pulled-left {
      max-width: 75%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .is-pulled-right {
      line-height: 1.8em;
    }

    .subtitle.is-5 {
      font-size: 1.23em;
    }

    .wind-compass {
      font-size: 0.7em;
      padding: 0;
      line-height: 1.6em;
      min-width: 25%;
      min-width: 25vw;
    }
  }

  .card-content {
    padding: 0;
    box-shadow: inset 0px 2px 8px rgba(10, 10, 10, 0.1), inset 0px -2px 8px rgba(10, 10, 10, 0.1);
    background: $dark;

    .content {
      font-size: 0.8em;
      padding: 0;

      .columns  {
        margin: 0;

        &>.column:last-child {
          padding: 0;
        }
      }
    }

    hr {
      margin: 0.25rem 0;
    }
  }
}
</style>
