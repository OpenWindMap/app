<template lang="html">
  <section>
    <v-map :zoom="zoom" :center="center" :minZoom="minZoom" @l-move="mapmove">
      <v-tilelayer
        :url="url"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <map-marker v-for="pioupiou in pioupious" :key="pioupiou.id"
        :location="pioupiou.location" :measurements="pioupiou.measurements"
        :title="`pioupiou #${pioupiou.id}`" @l-click="showPioupiou(pioupiou)"
      ></map-marker>
    </v-map>
  </section>
</template>

<script lang="buble">
import { Map as vMap, TileLayer as vTilelayer } from 'vue2-leaflet'

import mapMarker from '@/components/map-marker'

export default {
  name: 'map-view',

  components: { vMap, vTilelayer, mapMarker },

  data() {
    return {
      // url: 'http://pioupiou.fr/tiles/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 5,
      minZoom: 3,
      center: [46.76306, 2.42472],
      bounds: undefined
    }
  },

  methods: {
    mapmove(evt) {
      this.$set(this, 'bounds', evt.target.getBounds())
    },
    showPioupiou(pioupiou) {
      this.$router.push({ name: 'Details', params: { id: pioupiou.id } })
    }
  },

  computed: {
    pioupious() {
      return this.$store.getters['pioupious/visible']
    }
  },

  mounted() {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.$set(this, 'zoom', 15)
    //     this.$set(this, 'center', [position.coords.latitude, position.coords.longitude])
    //   })
    // }

    this.$store.dispatch('pioupious/fetchAll')
    // this.$store.dispatch('pioupious/keepAllUpdated')
  }
}
</script>

<style lang="scss">
  @import "~leaflet/dist/leaflet.css";

  #map {
    flex: 1 1 auto;
    min-height: 50vh;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .leaflet-top .leaflet-control {
    margin-top: 20px;
  }
</style>
