<template lang="html">
  <section>
    <keep-alive>
      <map-content :map-markers="pioupious" @marker-click="showPioupiou"></map-content>
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
    }
  },

  computed: {
    pioupious() {
      return this.$store.getters['pioupious/visible']
    }
  },

  mounted() {
    this.$store.dispatch('pioupious/fetchAll')
    // this.$store.dispatch('pioupious/keepAllUpdated')
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
