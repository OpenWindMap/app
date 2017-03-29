<template lang="html">
  <section>
    <keep-alive>
      <v-map :zoom="zoom" :center="center">
        <v-tilelayer
          :url="url"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"></v-tilelayer>
      </v-map>
    </keep-alive>
  </section>
</template>

<script lang="buble">
import { Map as vMap, TileLayer as vTilelayer, Marker as vMarker } from 'vue2-leaflet'

export default {
  name: 'map-view',

  components: { vMap, vTilelayer, vMarker },

  data() {
    return {
      url: 'http://pioupiou.fr/tiles/{z}/{x}/{y}.png',
      zoom: 13,
      center: [47.413220, -1.219482]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~leaflet/dist/leaflet.css";
</style>
