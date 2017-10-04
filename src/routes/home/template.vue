<template lang="html">
  <section>
    <nav class="nav has-shadow is-hidden-desktop">
      <div class="nav-center">
        <router-link to="/" class="nav-item">
          <img src="~static/img/pioupiou-logo.svg" class="inverted" alt="Pioupiou logo">
        </router-link>
      </div>
    </nav>
    <div class="columns">
      <div class="column" v-if="historiesPioupious.length === 0">
        <h5 class="subtitle is-5">
            <translate>Welcome to the Pioupiou Wind Network!</translate>
        </h5>
        <h6 class="subtitle is-6">
          <translate>Search for a spot or use the map to begin with</translate>
        </h6>
        <br>
      </div>
      <div class="column">
        <h5 class="subtitle is-5">
          <span class="icon">
            <i class="fa fa-street-view"></i>
          </span>
          <translate>Proche de vous</translate>
        </h5>
        <station-overview v-for="pioupiou in nearsPioupious" v-if="pioupiou.id"
          :key="pioupiou.id" :station="pioupiou" :offlineMode="offlineMode"
          :opened="opened === pioupiou.id && context === 'F'" @open="show" @show="show">
        </station-overview>
        <h6 class="subtitle is-6" v-if="nearsPioupious.length === 0">
          <translate>No nears spots yet</translate>
        </h6>
      </div>
      <div class="column">
        <h5 class="subtitle is-5">
          <span class="icon">
            <i class="fa fa-star"></i>
          </span>
          <translate>Favorites</translate>
        </h5>
        <station-overview v-for="pioupiou in favoritesPioupious" v-if="pioupiou.id"
          :key="pioupiou.id" :station="pioupiou" :offlineMode="offlineMode"
          :opened="opened === pioupiou.id && context === 'F'" @open="show" @show="show">
        </station-overview>
        <h6 class="subtitle is-6" v-if="favoritesPioupious.length === 0">
          <translate>No favorite spots yet</translate>
        </h6>
      </div>
      <div class="column">
        <h5 class="subtitle is-5">
          <span class="icon">
            <i class="fa fa-history"></i>
          </span>
          <translate>History</translate>
        </h5>
        <station-overview v-for="pioupiou in historiesPioupious" v-if="pioupiou.id"
          :key="pioupiou.id" :station="pioupiou" :offlineMode="offlineMode"
          :opened="opened === pioupiou.id && context === 'H'" @open="show" @show="show">
        </station-overview>
        <h6 class="subtitle is-6" v-if="historiesPioupious.length === 0">
          <translate>No history yet</translate>
        </h6>
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
    nearsPioupious() {
      return this.$store.getters['pioupious/findByProximity'](
        this.$store.state.user.position, 70 * 1000
      ).slice(0, 5)
    },
    histories() {
      return this.$store.state.user.histories
    },
    favorites() {
      return this.$store.state.user.favorites
    },
    offlineMode() {
      return this.$parent.offlineMode
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

    this.$store.dispatch('pioupious/fetchAll')
    this.$store.dispatch('pioupious/keepAllUpdated')

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

    this.$store.dispatch('pioupious/stopAllToBeUpdated')
  },

  methods: {
    open(pioupiou, ctx) {
      this.opened = this.opened === pioupiou.id && this.context === ctx ? undefined : pioupiou.id
      this.context = ctx
    },
    show(pioupiou, callLink) {
      if (this.offlineMode) {
        window.location.href = callLink
      } else {
        this.$router.push({ name: 'details', params: { id: pioupiou.id } })
      }
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
        padding-bottom: 3em;
      }
    }

    &:last-child {
      margin-bottom: initial;
    }
  }

  .subtitle {
    padding: 12px 12px 0px;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  .nav-item img {
    max-height: 2em;
  }
</style>
