<template lang="html">
  <wind-marker
    :lat-lng="{lat: location.latitude, lng: location.longitude}"
    :heading="measurements.wind_heading" :speed="measurements.wind_speed_max"
    :visible="visible" ref="marker"></wind-marker>
</template>

<script lang="buble">
import windMarker from '@/components/wind-marker'

export default {
  name: 'map-marker',

  components: { windMarker },

  props: {
    location: {
      type: Object,
      required: true,
      validator: obj => 'longitude' in obj && 'latitude' in obj
    },

    measurements: {
      type: Object,
      required: true,
      validator: obj => 'wind_heading' in obj && 'wind_speed_max' in obj
    },

    visible: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {}
  },

  mounted() {
    if (this.$parent._isMounted) {
      this.$refs.marker.deferredMountedTo(this.$parent.mapObject)
    }
  }
}
</script>

<style lang="scss">
  .map-marker-icon {
    background: url("~static/img/map-wind-icon.png");
    background-position: 0px 0px;
    border: none;
  }
</style>
