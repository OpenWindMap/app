<template lang="html">
  <section>
    <map-content :map-markers="pioupious" :center="userCenter" :zoom="userZoom"
      @marker-click="showPioupiou" @controls-change="controlsChange"></map-content>
    <!-- <map-legend></map-legend> -->
    <keep-alive>
      <router-view class="side"></router-view>
    </keep-alive>
  </section>
</template>

<script lang="buble">
import mapContent from '@/components/map-content'
import mapLegend from '@/components/map-legend'

export default {
  name: 'map-view',

  components: { mapContent, mapLegend },

  data() {
    return {}
  },

  methods: {
    showPioupiou(pioupiou) {
      this.$router.push({ name: 'desktop-details', params: { id: pioupiou.id } })
    },
    controlsChange({ zoom, center }) {
      if (zoom === this.userZoom && center.lat === this.userCenter[0] && center.lng === this.userCenter[1]) return

      this.$store.dispatch('user/pushMapControls', { zoom, center: [center.lat, center.lng] })
    }
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

  activated() {
    this.$store.dispatch('pioupious/fetchAll')
    this.$store.dispatch('pioupious/keepAllUpdated')
  },

  deactivated() {
    this.$store.dispatch('pioupious/stopAllToBeUpdated')
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  #map {
    flex: 1 1 auto;
    min-height: 50vh;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  section.side {
    position: absolute;
    right: 0;
    width: 30vw;
    z-index: 999;
    height: 100%;
    background: $body-background;
  }
</style>
