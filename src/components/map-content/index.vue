<template lang="html">
  <v-map :zoom="zoom" :center="enumCenter" :min-zoom="minZoom" @l-viewreset="boundsChange" @l-moveend="boundsChange" @l-zoomend="boundsChange" ref="map">
    <v-tilelayer
      :url="url"
      attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
    />
    <map-marker v-for="marker in mapMarkers" :key="marker.key || marker.id"
      :location="marker.location" :measurements="marker.measurements"
      :title="marker.title || `#${marker.key || marker.id}`" @l-click="markerClick(marker)"
    ></map-marker>
  </v-map>
</template>

<script lang="buble">
import { Map as vMap, TileLayer as vTilelayer } from 'vue2-leaflet'

import mapMarker from '@/components/map-marker'

export default {
  name: 'map-content',

  components: { vMap, vTilelayer, mapMarker },

  props: {
    zoom: {
      type: Number,
      default: 5
    },

    center: {
      type: [Object, Array],
      default: () => [46.76306, 2.42472] // France True-center
    },

    autoCenter: {
      type: String,
      default: ''
    },

    mapMarkers: {
      type: Array
    }
  },

  data() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.$set(this, 'myPosition', [position.coords.latitude, position.coords.longitude])
      })
    }

    return {
      // url: 'http://pioupiou.fr/tiles/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      minZoom: 3,
      myPosition: [undefined, undefined]
    }
  },

  computed: {
    enumCenter() {
      switch (this.autoCenter) {
        case 'marker':
          return [this.mapMarkers[0].location.latitude, this.mapMarkers[0].location.longitude]
        case 'me':
          return this.myPosition[0] !== undefined && this.myPosition[1] !== undefined ?
            this.myPosition : this.center
        default:
          return this.center
      }
    }
  },

  methods: {
    markerClick(marker) {
      this.$emit('marker-click', marker)
    },
    boundsChange() {
      this.$emit('bounds-change', this.$refs.map.mapObject.getBounds())

      this.controlsChange()
    },
    controlsChange() {
      this.$emit('controls-change', {
        zoom: this.$refs.map.mapObject.getZoom(),
        center: this.$refs.map.mapObject.getCenter()
      })
    }
  },

  mounted() {
    this.boundsChange()

    this.$forceUpdate()
  },

  updated() {
    this.$nextTick(() => {
      this.$refs.map.mapObject.invalidateSize()
    })
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
</style>
