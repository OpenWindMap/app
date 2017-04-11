<template lang="html">
  <div class="card">
    <header class="card-header" @click="open(station)">
      <div class="is-clearfix is-fullwidth">
        <div class="is-pulled-left">
          <strong>{{ station.meta && station.meta.name || `${ $gettext('Unnamed station') }` }}</strong> <br>
          <small>#{{ station.id }}</small> -
          <small v-if="station.measurements">
            {{ station.measurements.date | timeago }}
          </small>
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
        </div>
        <div class="is-pulled-right">
          <wind-compass class="wind-compass" v-if="station.measurements"
            :inline="true" :icon-only="opened" :hide="opened" :label="$gettext('AVG')"
            :heading="station.measurements.wind_heading || 0"
            :speed-min="station.measurements.wind_speed_min || 0"
            :speed-avg="station.measurements.wind_speed_avg || 0"
            :speed-max="station.measurements.wind_speed_max || 0">
          </wind-compass>
        </div>
      </div>
    </header>
    <div class="card-content" v-show="opened" @click="show(station)">
      <div class="content">
        <hr>
        <wind-overview v-if="station.measurements"
          :heading="station.measurements.wind_heading || 0"
          :speed-min="station.measurements.wind_speed_min || 0"
          :speed-avg="station.measurements.wind_speed_avg || 0"
          :speed-max="station.measurements.wind_speed_max || 0">
        </wind-overview>
        <history-chart></history-chart>
        <br>
      </div>
    </div>
  </div>
</template>

<script lang="buble">
import windCompass from '@/components/wind-compass'
import windOverview from '@/components/wind-overview'
import historyChart from '@/components/history-chart'

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
    }
  },

  methods: {
    open(pioupiou) {
      this.$emit('open', pioupiou)
    },
    show(pioupiou) {
      this.$emit('show', pioupiou)
    }
  }
}
</script>

<style lang="scss" scoped>
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
      line-height: 1.8rem;
    }

    .subtitle.is-5 {
      font-size: 1.23rem;
    }

    .wind-compass {
      font-size: 0.7em;
      padding: 0;
      line-height: 1.6em;
      min-width: 25vw;
    }
  }

  .card-content {
    padding: 0;
    box-shadow: inset 0px 2px 8px rgba(10, 10, 10, 0.1), inset 0px -2px 8px rgba(10, 10, 10, 0.1);
    background: #fefefe;

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
