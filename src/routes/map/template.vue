<template lang="html">
  <section>
    <v-map :zoom="zoom" :center="center" :minZoom="minZoom" @l-move="mapmove">
      <v-tilelayer
        :url="url"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <div class="leaflet-empty-marker">
        <template v-for="pioupiou in pioupious">
          <map-marker :location="pioupiou.location" :measurements="pioupiou.measurements"
            :title="`pioupiou #${pioupiou.id}`" @l-click="showPioupiou(pioupiou)"
          ></map-marker>
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
      minZoom: 3,
      center: [48.866667, 2.333333],
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
    this.$store.dispatch('pioupious/keepAllUpdated')
  }
}
</script>

<style lang="scss">
  @import "~leaflet/dist/leaflet.css";
</style>
