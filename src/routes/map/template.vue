<template lang="html">
  <section>
    <v-map :zoom="zoom" :center="center" @l-move="mapmove">
      <v-tilelayer
        :url="url"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <template v-for="pioupiou in visiblePioupious">
        <v-marker :lat-lng="{lat: pioupiou.location.latitude, lng: pioupiou.location.longitude}" :icon="icon"></v-marker>
      </template>
    </v-map>
  </section>
</template>

<script lang="buble">
import { Map as vMap, TileLayer as vTilelayer, Marker as vMarker } from 'vue2-leaflet'
import L from 'leaflet'

export default {
  name: 'map-view',

  components: { vMap, vTilelayer, vMarker },

  data() {
    return {
      // url: 'http://pioupiou.fr/tiles/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [48.866667, 2.333333],
      icon: L.divIcon({
        iconSize: [26, 48],
        popupAnchor: [1, -10],
        iconAnchor: [13, 12]
      }),
      bounds: undefined,
      pioupious: []
    }
  },

  methods: {
    mapmove(evt) {
      this.$set(this, 'bounds', evt.target.getBounds())
    }
  },

  computed: {
    visiblePioupious() {
      return this.pioupious.filter(pioupiou =>
        pioupiou.location.date !== null /* &&
        (
          !this.bounds ||
          (
            this.bounds &&
            pioupiou.location.latitude >= this.bounds.getSouthWest().lat &&
            pioupiou.location.longitude >= this.bounds.getSouthWest().lng &&
            pioupiou.location.latitude <= this.bounds.getNorthEast().lat &&
            pioupiou.location.longitude <= this.bounds.getNorthEast().lng
          )
        ) */
      )
    }
  },

  mounted() {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.$set(this, 'zoom', 15)
    //     this.$set(this, 'center', [position.coords.latitude, position.coords.longitude])
    //   })
    // }

    this.$http.get('live/all').then(({ body: response }) => {
      this.$set(this, 'pioupious', response.data)
    })
  }
}
</script>

<style lang="scss">
  @import "~leaflet/dist/leaflet.css";

  .leaflet-div-icon {
    background: url("~static/img/map-wind-icon.png");
    background-position: 0px 0px;
    border: none;
  }
</style>
