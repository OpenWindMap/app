<template>
  <a :href="callLink">
    <span class="icon">
      <i class="fa fa-phone"></i>
    </span>
  </a>
</template>

<script lang="buble">
import Vue from 'vue'

export default {
  name: 'call-station',

  props: {
    stationId: {
      Type: Number,
      required: true
    }
  },

  computed: {
    callLink() {
      const unitcode = Vue.config.unit === 'knots' ? 81 : 41
      const id = this.stationId
      return `tel:+339724771${unitcode},${id}`
    }
  }
}
</script>

<style lang="scss" scoped>
  a {
    text-align: center;
    line-height: 1em;
  }

  span:not(.icon) {
    font-size: 0.8em;
  }

  a:hover {
    color: white;
  }
</style>
