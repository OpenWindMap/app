<template lang="html">
  <div class="columns is-mobile has-text-centered">
    <div class="column is-3-mobile">
      <strong>{{headingFromCompass}}</strong>
      <br>
      {{heading}}°
    </div>
    <div class="column is-offset-3 is-2-mobile">
      <strong>{{speedMin}}</strong>
      <br>
      <small>MIN</small>
    </div>
    <div class="column is-2-mobile has-highlight">
      <strong>{{speedAvg}}</strong>
      <br>
      <small>AVG</small>
    </div>
    <div class="column is-2-mobile">
      <strong>{{speedMax}}</strong>
      <br>
      <small>MAX</small>
    </div>
  </div>
</template>

<script lang="buble">
export default {
  name: 'wind-overview',

  props: {
    heading: {
      type: Number,
      required: true
    },

    speedAvg: {
      type: Number,
      required: true
    },

    speedMin: {
      type: Number,
      required: true
    },

    speedMax: {
      type: Number,
      required: true
    }
  },

  computed: {
    headingFromCompass() {
      return '--'
    }
  }
}
</script>

<style lang="scss" scoped>
  .columns {
    font-size: 1.1rem;
  }

  small {
    font-weight: 300;
  }

  .has-highlight strong {
    font-size: 1.3rem;
    line-height: .9;
  }
</style>
