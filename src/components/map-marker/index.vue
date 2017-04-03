<template lang="html">
  <wind-marker :title="title"
    :lat-lng="{lat: location.latitude, lng: location.longitude}"
    :heading="measurements.wind_heading" :speed="measurements.wind_speed_max || measurements.wind_speed_avg"
    :visible="visible" @l-click="click" ref="marker"></wind-marker>
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
      validator: obj => 'wind_heading' in obj && 'wind_speed_max' in obj && 'wind_speed_min' in obj && 'wind_speed_avg' in obj
    },

    title: {
      type: String
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
  },

  methods: {
    click() {
      this.$emit('l-click', this)
    },
    deferredMountedTo(parent) {
      this.$refs.marker.deferredMountedTo(parent)
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
