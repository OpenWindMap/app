<template lang="html">
  <map-content :map-markers="pioupious" :center="userCenter" :zoom="userZoom"
    @marker-click="showPioupiou" @controls-change="controlsChange" :key="'1234567890'"></map-content>
</template>

<script lang="buble">
import mapContent from '@/components/map-content'

export default {
  name: 'all-in-map-content',

  components: { mapContent },

  props: {},

  data() {
    return {}
  },

  computed: {
    pioupious() {
      return this.$store.getters['pioupious/visible']
    },
    userCenter() {
      return this.$store.state.user.center
    },
    userZoom() {
      return this.$store.state.user.zoom
    }
  },

  methods: {
    showPioupiou(pioupiou) {
      this.$router.push({ name: 'details', params: { id: pioupiou.id } })
    },
    controlsChange({ zoom, center }) {
      if (zoom === this.userZoom && center.lat === this.userCenter[0] && center.lng === this.userCenter[1]) return

      this.$store.dispatch('user/pushMapControls', { zoom, center: [center.lat, center.lng] })
    }
  },

  activated() {
    this.$store.dispatch('pioupious/fetchAll')
    this.$store.dispatch('pioupious/keepAllUpdated')
  }
}
</script>

<style lang="scss">
  @import "~leaflet/dist/leaflet.css";

  .leaflet-top .leaflet-control {
    margin-top: 20px;
  }

  .leaflet-top.leaflet-left {
    position: static;
  }

  // .leaflet-tile-pane {
  //   opacity: 0.9;
  // }
  //
  // .leaflet-container {
  //   background-color: initial;
  // }

  .leaflet-control.leaflet-control-attribution {
    display: none;
  }

  #map .icon {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .fa {
      font-size: 34px;
    }
  }
</style>
