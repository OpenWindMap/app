<template>
  <v-map :zoom="zoom" :center="enumCenter" :min-zoom="minZoom" @l-viewreset="boundsChange" @l-moveend="boundsChange" @l-zoomend="boundsChange" ref="map">
    <v-tilelayer
      :url="url"
      attribution="<a href='https://osm.org/copyright'>OpenStreetMap</a> contributors | <a href='https://meteo-parapente.com'>Meteo-Parapente.com</a>"
    />
    <v-marker :lat-lng="[myPosition.latitude, myPosition.longitude]" v-if="myPosition" :icon="icon"></v-marker>
    <map-marker v-for="marker in mapMarkers" :key="marker.key || marker.id"
      :location="marker.location" :measurements="marker.measurements"
      :title="marker.title || `#${marker.key || marker.id}`" @l-click="markerClick(marker)"
    ></map-marker>
    <div class="leaflet-control-container" v-if="lockButton">
      <div class="leaflet-top leaflet-left leaflet-after">
        <div class="leaflet-control-lock leaflet-bar leaflet-control" :class="{ hold }">
          <a class="leaflet-control-lock" title="Move on me" role="button" aria-label="Move on me" @click="moveOnMe" @longtap="stickOnMe">⌖</a>
        </div>
      </div>
    </div>
    <span class="icon" v-if="mapMarkers && !mapMarkers.length">
      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
    </span>
  </v-map>
</template>

<script lang="buble">
import L from 'leaflet'
import { Map as vMap, TileLayer as vTilelayer, Marker as vMarker } from 'vue2-leaflet'

import mapMarker from '@/components/map-marker/index.vue'

export default {
  name: 'map-content',

  components: { vMap, vTilelayer, vMarker, mapMarker },

  props: {
    zoom: {
      type: Number,
      default: 5
    },

    center: {
      type: [Object, Array],
      default: () => [46.76306, 2.42472] // France True-center
    },

    lockButton: {
      type: Boolean,
      default: true
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
    return {
      url: 'https://{s}.base-layers.meteo-parapente.com/osm-shaded/{z}/{x}/{y}.png',
      minZoom: 3,
      hold: false,
      icon: L.divIcon({
        className: 'fa fa-street-view',
        iconSize: [29, 34],
        iconAnchor: [14.5, 10]
      })
    }
  },

  computed: {
    myPosition() {
      return this.$store.state.user.position
    },
    enumCenter() {
      switch (this.autoCenter) {
        case 'marker':
          return [this.mapMarkers[0].location.latitude, this.mapMarkers[0].location.longitude]
        case 'me':
          return this.myPosition === undefined ?
             this.center : [this.myPosition.latitude, this.myPosition.longitude]
        default:
          return this.center
      }
    }
  },
  watch: {
    myPosition() {
      if (this.hold) {
        try {
          this.moveOnMe()
        } catch (e) {
          this.hold = false
        }
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

      this.$emit('center-change', this.$refs.map.mapObject.getCenter())
      this.$emit('zoom-change', this.$refs.map.mapObject.getZoom())
    },
    moveOnMe() {
      if (!this.$store.state.user.positionWatch) this.enablePositionWatch()
      let zoom = this.zoom
      if (!this.hold && zoom < 10) {
        zoom = 10
      }
      const center = { lat: this.myPosition.latitude, lng: this.myPosition.longitude }

      this.$emit('controls-change', { zoom, center })
      this.$emit('center-change', center)
      this.$emit('zoom-change', zoom)
    },
    stickOnMe() {
      if (!this.$store.state.user.positionWatch) this.enablePositionWatch()
      if (this.hold) {
        this.hold = false
      } else {
        this.moveOnMe()
        this.hold = true
      }
    },
    enablePositionWatch() {
      this.$store.dispatch('user/setPositionWatch', { positionWatch: true })
    }
  },

  mounted() {
    this.boundsChange()

    this.$refs.map.mapObject.invalidateSize()
  },

  activated() {
    this.$refs.map.mapObject.invalidateSize()
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

  // .leaflet-tile-pane {
  //   opacity: 0.9;
  // }
  //
  // .leaflet-container {
  //   background-color: initial;
  // }

  .leaflet-top.leaflet-left.leaflet-after {
    position: absolute;
    top: 75px;
  }

  .leaflet-control-lock.hold .leaflet-control-lock {
    color: #3b74c9;
    font-weight: bold;
  }

  .leaflet-control-lock {
    font-size: 22px;
    font-weight: bold;
  }

  .vue2leaflet-map .icon {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .fa {
      font-size: 34px;
    }
  }

  .vue2leaflet-map .fa.fa-street-view {
    font-size: 34px;
    color: #3b74c9;
  }

  .leaflet-control-container .leaflet-top {
    z-index: unset;
  }
</style>
