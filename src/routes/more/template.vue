<template lang="html">
  <section>
    <wind-compass v-if="pioupiou.measurements"
      :heading="pioupiou.measurements.wind_heading"
      :speed-min="pioupiou.measurements.wind_speed_min"
      :speed-avg="pioupiou.measurements.wind_speed_avg"
      :speed-max="pioupiou.measurements.wind_speed_max">
    </wind-compass>

    <br>

    <wind-compass v-if="pioupiou.measurements"
      :heading="pioupiou.measurements.wind_heading"
      :speed-min="pioupiou.measurements.wind_speed_min"
      :speed-avg="pioupiou.measurements.wind_speed_avg"
      :speed-max="pioupiou.measurements.wind_speed_max"
      :inline="true">
    </wind-compass>

    <br>

    <wind-compass v-if="pioupiou.measurements"
      :heading="pioupiou.measurements.wind_heading"
      :speed-min="pioupiou.measurements.wind_speed_min"
      :speed-avg="pioupiou.measurements.wind_speed_avg"
      :speed-max="pioupiou.measurements.wind_speed_max"
      :icon-only="true">
    </wind-compass>
  </section>
</template>

<script lang="buble">
import windCompass from '@/components/wind-compass'

export default {
  name: 'more-view',

  components: { windCompass },

  computed: {
    pioupiou() {
      return this.$store.getters['pioupious/get'](265)
    }
  },

  mounted() {
    this.$store.dispatch('pioupious/fetchOne', { stationId: 265 })
  }
}
</script>

<style lang="scss" scoped>

</style>
