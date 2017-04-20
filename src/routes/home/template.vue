<template lang="html">
  <section>
    <nav class="nav has-shadow">
      <div class="nav-center">
        <router-link to="/" class="nav-item">
          <img src="~static/img/pioupiou-logo.svg" alt="Pioupiou logo">
        </router-link>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <h5 class="subtitle is-5">
          <translate>History</translate>
        </h5>
        <station-overview v-for="pioupiou in historiesPioupious" v-if="pioupiou.id"
          :key="pioupiou.id" :station="pioupiou"
          :opened="opened === pioupiou.id && context === 'H'" @open="show(pioupiou)" @show="show(pioupiou)">
        </station-overview>
      </div>
      <div class="column">
        <h5 class="subtitle is-5">
          <translate>Favorites</translate>
        </h5>
        <station-overview v-for="pioupiou in favoritesPioupious" v-if="pioupiou.id"
          :key="pioupiou.id" :station="pioupiou"
          :opened="opened === pioupiou.id && context === 'F'" @open="show(pioupiou)" @show="show(pioupiou)">
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
    },
    histories() {
      return this.$store.state.user.histories
    },
    favorites() {
      return this.$store.state.user.favorites
    }
  },

  watch: {
    histories() {
      this.histories.forEach(
        id => {
          this.$store.dispatch('pioupious/fetchOne', { stationId: id })
          this.$store.dispatch('pioupious/keepOneUpdated', { stationId: id })
        }
      )
    },
    favorites() {
      this.favorites.forEach(
        id => {
          this.$store.dispatch('pioupious/fetchOne', { stationId: id })
          this.$store.dispatch('pioupious/keepOneUpdated', { stationId: id })
        }
      )
    }
  },

  activated() {
    this.opened = undefined
    this.context = undefined

    this.$forceUpdate()
  },

  deactivated() {
    this.favorites.forEach(
      id => {
        this.$store.dispatch('pioupious/stopOneToBeUpdated', { stationId: id })
      }
    )
    this.histories.forEach(
      id => {
        this.$store.dispatch('pioupious/stopOneToBeUpdated', { stationId: id })
      }
    )
  },

  methods: {
    open(pioupiou, ctx) {
      this.opened = this.opened === pioupiou.id && this.context === ctx ? undefined : pioupiou.id
      this.context = ctx
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

      &:last-child {
        padding-bottom: 3rem;
      }
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

  .nav-item img {
    max-height: 2em;
  }
</style>
