<template lang="html">
  <section>
    <v-map :zoom="zoom" :center="center">
      <v-tilelayer
        :url="url"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
    </v-map>
  </section>
</template>

<script lang="buble">
import { Map as vMap, TileLayer as vTilelayer, Marker as vMarker } from 'vue2-leaflet'

export default {
  name: 'map-view',

  components: { vMap, vTilelayer, vMarker },

  data() {
    return {
      // url: 'http://pioupiou.fr/tiles/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [48.866667, 2.333333],
      pioupious: []
    }
  },

  mounted() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.$set(this, 'zoom', 15)
        this.$set(this, 'center', [position.coords.latitude, position.coords.longitude])
      })
    }

    this.$http.get('live/all').then(({ body: response }) => {
      this.$set(this, 'pioupious', response.data)

      console.log(this.pioupious)
    })
  }
}
</script>

<style lang="scss">
  @import "~leaflet/dist/leaflet.css";
</style>
