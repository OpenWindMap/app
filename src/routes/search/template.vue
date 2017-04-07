<template lang="html">
  <section>
    <nav class="nav has-shadow">
      <div class="field is-fullwidth nav-item">
        <p class="control is-fullwidth has-icon has-icon-right">
          <!-- <input class="input" type="text" placeholder="Search something awesome..." v-model="searchInput">
          <span class="icon">
            <i class="fa fa-remove" v-if="searchInput !== ''"></i>
            <i class="fa fa-search" v-else></i>
          </span> -->
          <v-select :value.sync="searchInput" :options="locationResult" @search="getOptions"></v-select>
        </p>
      </div>
    </nav>
    <div class="columns">
      <div class="column has-text-centered search-highlight" v-if="searchInput === ''">
        <br>
        <br>
        <h6 class="subtitle is-6">Find a spot</h6>
        <ul>
          <li><a href="#">Maui - Hawaï</a></li>
          <li><a href="#">Tarifa - Spain</a></li>
          <li><a href="#">Almanarre - France</a></li>
          <li><a href="#">Beouwersdam - Netherland</a></li>
        </ul>
        <br>
        <hr>
        <br>
        <h6 class="subtitle is-6">Find a Pioupiou</h6>
        <ul>
          <li v-for="pioupiou in highlightsPioupious" v-if="pioupiou !== undefined" :key="pioupiou.id">
            <router-link :to="{ 'name': 'details', 'params': { id: pioupiou.id } }">
              <span>{{ pioupiou.meta && pioupiou.meta.name || $gettext('Unnamed Pioupiou') }}</span>
              <span> #{{ pioupiou.id }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="column columns" v-else>
        <!-- <div class="column" v-if="searchResults.length && searchResults[0] !== undefined">
          <map-content :zoom="9" :map-markers="searchResults" :center="[43.274602, 5.707267]"></map-content>
        </div> -->
        <div class="column" v-if="searchResults.length">
          <station-overview v-for="pioupiou in searchResults" v-if="pioupiou !== undefined"
            :key="pioupiou.id" :station="pioupiou"
            :opened="opened === pioupiou.id" @open="open(pioupiou)" @show="show(pioupiou)">
          </station-overview>
        </div>

        <div class="column" v-if="locationResult.length">
          <ul>
            <li v-for="location in locationResult">
              {{ location.properties.name }}, {{ location.properties.country }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="buble">
import mapContent from '@/components/map-content'
import stationOverview from '@/components/station-overview'
import vSelect from 'vue-select'

export default {
  name: 'search-view',

  components: { mapContent, stationOverview, vSelect },

  data() {
    return {
      searchInput: '',
      opened: undefined,
      highlights: [419, 293, 576, 401]
    }
  },

  computed: {
    highlightsPioupious() {
      return this.highlights.map(
        id => this.$store.getters['pioupious/get'](id)
      )
    },
    searchResults() {
      return this.$store.getters['pioupious/find'](this.searchInput)
    },
    locationResult() {
      return this.$store.state.pioupious.locationResult.map(
        loc => ({ label: `${loc.properties.name}, ${loc.properties.country}`, value: loc })
      )
    }
  },

  mounted() {
    // this.highlights.forEach(
    //   id => this.$store.dispatch('pioupious/fetchOne', { stationId: id })
    // )

    this.$store.dispatch('pioupious/fetchAll')
  },

  methods: {
    open(pioupiou) {
      this.opened = this.opened === pioupiou.id ? undefined : pioupiou.id
    },
    show(pioupiou) {
      this.$router.push({ name: 'details', params: { id: pioupiou.id } })
    },
    getOptions(search) {
      this.$store.dispatch('pioupious/searchLocation', { query: search })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-highlight {
    padding: 0.75rem;

    a {
      color: black;
      text-decoration: underline;
      font-weight: 200;
    }

    .subtitle {
      margin-bottom: 0.9rem;
      margin-left: 0;
    }

    li {
      line-height: 30px;
    }

    hr {
      margin: 1.5rem 1.5rem;
    }
  }

  #map {
    height: 180px;
  }

  .nav.has-shadow {
    z-index: 999;
  }

  .columns {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;

    .column {
      padding: 0;

      &:last-child {
        padding-bottom: 3rem;
      }
    }

    &:last-child {
      margin-bottom: initial;
    }
  }
</style>
