<template lang="html">
  <section>
    <v-map :zoom="zoom" :center="center" @l-move="mapmove">
      <v-tilelayer
        :url="url"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <div class="leaflet-empty-marker">
        <template v-for="pioupiou in pioupious">
          <map-marker :location="pioupiou.location" :measurements="pioupiou.measurements"></map-marker>
        </template>
      </div>
    </v-map>
  </section>
</template>

<script lang="buble">
import { Map as vMap, TileLayer as vTilelayer } from 'vue2-leaflet'

import vMarker from 'vue2-leaflet/src/components/Marker.vue'

import mapMarker from '@/components/map-marker'

export default {
  name: 'map-view',

  components: { vMap, vTilelayer, mapMarker, vMarker },

  data() {
    return {
      // url: 'http://pioupiou.fr/tiles/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [48.866667, 2.333333],
      bounds: undefined
    }
  },

  methods: {
    mapmove(evt) {
      this.$set(this, 'bounds', evt.target.getBounds())
    }
  },

  computed: {
    pioupious() {
      return this.$store.getters.visiblePioupious
    }
  },

  mounted() {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.$set(this, 'zoom', 15)
    //     this.$set(this, 'center', [position.coords.latitude, position.coords.longitude])
    //   })
    // }

    this.$store.dispatch('fetchAllPioupious')
  }
}
</script>

<style lang="scss">
  @import "~leaflet/dist/leaflet.css";
</style>
