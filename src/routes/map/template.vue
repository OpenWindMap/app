<template lang="html">
  <section>
    <keep-alive>
      <map-content :map-markers="pioupious" :center="userCenter" :zoom="userZoom"
        @marker-click="showPioupiou" @controls-change="controlsChange"></map-content>
    </keep-alive>
  </section>
</template>

<script lang="buble">
import mapContent from '@/components/map-content'

export default {
  name: 'map-view',

  components: { mapContent },

  data() {
    return {}
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

  computed: {
    pioupious() {
      return this.$store.getters['pioupious/visible']
    },
    userCenter() {
      console.log(this.$store.state.user.center)
      return this.$store.state.user.center
    },
    userZoom() {
      return this.$store.state.user.zoom
    }
  },

  mounted() {
    this.$store.dispatch('user/restoreStore')

    this.$store.dispatch('pioupious/fetchAll')
    this.$store.dispatch('pioupious/keepAllUpdated')
  }
}
</script>

<style lang="scss" scoped>
  #map {
    flex: 1 1 auto;
    min-height: 50vh;
    position: absolute;
    top: 0;
    bottom: 0;
  }
</style>
