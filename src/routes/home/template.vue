<template lang="html">
  <section>
    <div class="columns">
      <div class="column">
        <h5 class="subtitle is-5">History</h5>
        <station-overview v-for="pioupiou in historiesPioupious" v-if="pioupiou.id"
          :key="pioupiou.id" :station="pioupiou"
          :opened="opened === pioupiou.id && context === 'H'" @open="open(pioupiou, 'H')" @show="show(pioupiou)">
        </station-overview>
      </div>
      <div class="column">
        <h5 class="subtitle is-5">Favorites</h5>
        <station-overview v-for="pioupiou in favoritesPioupious" v-if="pioupiou.id"
          :key="pioupiou.id" :station="pioupiou"
          :opened="opened === pioupiou.id && context === 'F'" @open="open(pioupiou, 'F')" @show="show(pioupiou)">
        </station-overview>
      </div>
    </div>
  </section>
</template>

<script lang="buble">
import stationOverview from '@/components/station-overview'

export default {
  name: 'home-view',

  components: { stationOverview },

  data() {
    return {
      favorites: [542, 293, 438, 265],
      histories: [542, 293, 438, 265],
      opened: undefined,
      context: undefined
    }
  },

  computed: {
    favoritesPioupious() {
      return this.favorites.map(
        id => this.$store.getters['pioupious/get'](id)
      )
    },
    historiesPioupious() {
      return this.histories.map(
        id => this.$store.getters['pioupious/get'](id)
      )
    }
  },

  mounted() {
    this.favorites.forEach(
      id => this.$store.dispatch('pioupious/fetchOne', { stationId: id })
    )
    this.histories.forEach(
      id => this.$store.dispatch('pioupious/fetchOne', { stationId: id })
    )
  },

  methods: {
    open(pioupiou, ctx) {
      this.opened = this.opened === pioupiou.id && this.context === ctx ? undefined : pioupiou.id
      this.context = this.opened === pioupiou.id && this.context === ctx ? undefined : ctx
    },
    show(pioupiou) {
      this.$router.push({ name: 'details', params: { id: pioupiou.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .columns {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;

    .column {
      padding: 0.75rem 0;
    }

    &:last-child {
      margin-bottom: initial;
    }
  }

  .subtitle {
    padding: 12px 12px 0px;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
</style>
