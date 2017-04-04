<template lang="html">
  <section>
    <div class="columns">
      <div class="column">
        <div class="card" style="box-shadow: initial;">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left title is-5">
                <strong>{{pioupiou.meta && pioupiou.meta.name || `Pioupiou sans nom`}}</strong> <br>
                <small>#{{pioupiou.id}}</small> &mdash;
                <small v-if="pioupiouSet">
                  {{Math.abs(pioupiou.location.latitude)}} {{pioupiou.location.latitude > 0 ? 'N' : 'S'}}
                  ,
                  {{Math.abs(pioupiou.location.longitude)}} {{pioupiou.location.longitude > 0 ? 'E' : 'W'}}
                </small>
              </div>
              <div class="is-pulled-right title is-6">
                <small>11:21</small>
              </div>
            </div>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column">
                  <map-content v-if="pioupiou.measurements && pioupiou.location"
                    :zoom="14" :map-markers="[pioupiou]" auto-center="marker"></map-content>

                  <wind-overview v-if="pioupiou.measurements"
                    :heading="pioupiou.measurements.wind_heading"
                    :speedMin="pioupiou.measurements.wind_speed_min"
                    :speedAvg="pioupiou.measurements.wind_speed_avg"
                    :speedMax="pioupiou.measurements.wind_speed_max">
                  </wind-overview>
                </div>

                <div class="is-hidden-desktop">
                  <hr>
                </div>

                <div class="column">
                  <figure>
                    <img src="~static/img/chart.png">
                    <div class="direction has-text-centered">
                      <i class="typcn typcn-location-arrow compass-west"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-north-west"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-north"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-north"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-west"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-north-west"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-south"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-south"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-south-west"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-west"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-south"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-south"></i>
                      &nbsp;
                      <i class="typcn typcn-location-arrow compass-south-west"></i>
                    </div>
                  </figure>
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

export default {
  name: 'details-view',

  props: ['id'],

  components: { windOverview, mapContent },

  data() {
    return {}
  },

  computed: {
    pioupiou() {
      return this.$store.getters['pioupious/get'](this.id)
    },
    pioupiouSet() {
      return this.pioupiou && this.pioupiou.id !== undefined
    }
  },

  mounted() {
    this.$store.dispatch('pioupious/fetchOne', { stationId: this.id })
    this.$store.dispatch('pioupious/keepOneUpdated', { stationId: this.id })
  }
}
</script>

<style lang="scss" scoped>
  .card-header {
    padding: 12px 12px 0px;

    .title {
      margin-bottom: 0;
    }
  }

  .card-content {
    padding: 0;

    .content > .columns > .column:last-child {
      padding: 0;
    }
  }

  .columns.is-mobile {
    padding: 0 0.75rem;

    .column {
      padding: 0.25rem;
    }
  }

  .column {
    padding: 0.75rem 0;
  }

  .columns {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .card-header {
    box-shadow: initial;
  }

  .card-header .is-pulled-right {
    line-height: 1.8rem;
  }

  .subtitle.is-5 {
    font-size: 1.23rem;
  }

  #map {
    height: 180px;
  }

  hr {
    margin: 0.25rem 0;
  }

  figure {
    background-color: #fdfdfd;
  }

  article.message {
    background-color: #fcfcfc;

    .message-body {
      border-radius: initial;
    }
  }
</style>
