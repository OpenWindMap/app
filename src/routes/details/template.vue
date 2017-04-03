<template lang="html">
  <section>
    <div class="columns">
      <div class="column">
        <div class="card" style="box-shadow: initial;">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left title is-5">
                <strong>{{pioupiou.meta && pioupiou.meta.name || `Pioupiou sans nom`}}</strong> <br>
                <small>#{{pioupiou.id}}</small>
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
                  <wind-compass v-if="pioupiouSet"
                    :heading="pioupiou.measurements.wind_heading"
                    :speed="pioupiou.measurements.wind_speed_max || pioupiou.measurements.wind_speed_avg"></wind-compass>
                </div>

                <div class="is-hidden-desktop">
                  <br> <hr> <br>
                </div>

                <div class="column">

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
import windCompass from '@/components/wind-compass'

export default {
  name: 'details-view',

  props: ['id'],

  components: { windCompass },

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
    padding: 6px 12px;
  }

  .card-content {
    padding: 0.4rem;
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
</style>
