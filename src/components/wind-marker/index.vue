<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
// This component is a copy of the vue2-leaflet's Marker component

// import L from 'leaflet'

import { eventsBinder, propsBinder } from './utils'
import { windMarker } from './WindMarker'

const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseover',
  'mouseout',
  'contextmenu',
  'dragstart',
  'drag',
  'dragend',
  'move',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
]

const props = {
  draggable: {
    type: Boolean,
    custom: true,
    default: false
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  latLng: {
    type: Object,
    required: true
  },
  heading: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
}

export default {
  props,
  mounted() {
    const options = {}
    options.draggable = this.draggable
    options.speed = this.speed
    options.heading = this.heading
    options.title = this.title
    this.mapObject = windMarker(this.latLng, options)
    eventsBinder(this, this.mapObject, events)
    propsBinder(this, this.mapObject, props)
    if (this.$parent._isMounted) {
      this.deferredMountedTo(this.$parent.mapObject)
    }
  },
  beforeDestroy() {
    this.setVisible(false)
  },
  methods: {
    deferredMountedTo(parent) {
      this.parent = parent
      const that = this.mapObject
      for (let i = 0; i < this.$children.length; i++) {
        this.$children[i].deferredMountedTo(that)
      }
      if (this.visible) {
        this.mapObject.addTo(parent)
      }
    },
    setDraggable(newVal, oldVal) {
      if (this.mapObject.dragging) {
        return newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable()
      }
    },
    setVisible(newVal, oldVal) {
      if (newVal === oldVal) return
      if (this.mapObject) {
        if (newVal) {
          this.mapObject.addTo(this.parent)
        } else {
          this.parent.removeLayer(this.mapObject)
        }
      }
    }
  },
  watch: {
    heading(value) {
      this.mapObject.setHeading(value)
    },
    speed(value) {
      this.mapObject.setSpeed(value)
    },
    title(value) {
      this.mapObject.setTitle(value)
    }
  }
}
</script>
