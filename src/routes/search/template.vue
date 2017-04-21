<template lang="html">
  <section>
    <nav class="nav has-shadow fixed-header">
      <div class="field is-fullwidth nav-item">
        <p class="control is-fullwidth has-icon has-icon-right">
          <input class="input" type="text" :placeholder="$pgettext('Search something awesome...', 'Search field placeholder')"
            v-model="searchInput" @focus="searchFocused = true" @blur="blurLater">
          <span class="icon">
            <i class="fa fa-remove" v-if="searchInput !== ''" @click="searchInput = ''"></i>
            <i class="fa fa-search" v-else></i>
          </span>
          <ul class="autocomplete" v-if="searchFocused && (locationResult.length > 1 || preSearchResults.length > 1)">
            <li v-for="pioupiou in preSearchResults.slice(0, 5)" v-if="pioupiou !== undefined" @click="show(pioupiou)">
              <strong>{{ pioupiou.meta && pioupiou.meta.name || $gettext('Unnamed Pioupiou') }}</strong>
              <span> #{{ pioupiou.id }}</span>
            </li>
            <li v-for="location in locationResult" v-if="location !== undefined" @click="searchIn(location)">
              <strong>{{ location.properties.name }}</strong><span>, {{ location.properties.country }}</span>
            </li>
          </ul>
        </p>
      </div>
    </nav>
    <div class="columns" @click="searchFocused = false">
      <div class="column has-text-centered search-highlight" v-if="searchInput === ''">
        <br>
        <br>
        <h6 class="subtitle is-6">
          <translate translate-context="Search examples title">Find a spot</translate>
        </h6>
        <ul>
          <li><a @click="setSuggest('Maui, Hawaï', [20.802956799999997, -156.31068321602177])">
            Maui - Hawaï
          </a></li>
          <li><a @click="setSuggest('Tarifa, Spain', [36.0127749, -5.6048872])">
            Tarifa - Spain
          </a></li>
          <li><a @click="setSuggest('Chamonix-Mont-Blanc, France', [45.9246705, 6.8727506])">
            Chamonix-Mont-Blanc - France
          </a></li>
          <li><a @click="setSuggest('Biarritz, France', [43.4815899, -1.5561078])">
            Biarritz - France
          </a></li>
        </ul>
        <br>
        <hr>
        <br>
        <h6 class="subtitle is-6">
          <translate translate-context="Search examples title">Find a Pioupiou</translate>
        </h6>
        <ul>
          <li v-for="pioupiou in highlightsPioupious" v-if="pioupiou !== undefined" :key="pioupiou.id">
            <router-link :to="{ 'name': 'details', 'params': { id: pioupiou.id } }"
              v-if="pioupiou !== undefined && pioupiou.id !== undefined">
              <span>{{ pioupiou.meta && pioupiou.meta.name || $gettext('Unnamed Pioupiou') }}</span>
              <span> #{{ pioupiou.id }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="column columns" v-else>

        <div class="column fixed-header mini-map-container" v-if="searchLocation">
          <map-content :zoom="9" :map-markers="searchResults" :center="searchLocation" @bounds-change="boundsChange"></map-content>
        </div>

        <div class="column" v-if="searchResults.length">
          <station-overview v-for="pioupiou in searchResults" v-if="pioupiou !== undefined"
            :key="pioupiou.id" :station="pioupiou"
            :opened="opened === pioupiou.id" @open="show(pioupiou)" @show="show(pioupiou)">
          </station-overview>
        </div>
        <div class="column has-text-centered" v-else>
          <br><br>
          <span class="icon">
            <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="buble">
import mapContent from '@/components/map-content'
import stationOverview from '@/components/station-overview'
import { focus } from 'vue-focus'

export default {
  name: 'search-view',

  components: { mapContent, stationOverview },
  directives: { focus },

  data() {
    return {
      searchInput: '',
      searchFocused: false,
      searchLocation: undefined,
      searchBounds: undefined,
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
    preSearchResults() {
      return this.$store.getters['pioupious/findByName'](this.searchInput)
    },
    searchResults() {
      return this.preSearchResults.concat(
        this.$store.getters['pioupious/findByLoc'](this.searchBounds)
      )
    },
    locationResult() {
      return this.$store.state.pioupious.locationResult
    }
  },

  activated() {
    this.highlights.forEach(
      id => this.$store.dispatch('pioupious/fetchOne', { stationId: id })
    )
    this.$store.dispatch('user/restoreStore')

    this.$store.dispatch('pioupious/fetchAll')
    this.$store.dispatch('pioupious/keepAllUpdated')
  },

  deactivated() {
    this.$store.dispatch('pioupious/stopAllToBeUpdated')
  },

  methods: {
    open(pioupiou) {
      this.opened = this.opened === pioupiou.id ? undefined : pioupiou.id
    },
    show(pioupiou) {
      this.$router.push({ name: 'details', params: { id: pioupiou.id } })
    },
    searchIn(location) {
      this.searchInput = `${location.properties.name}, ${location.properties.country}`
      this.searchLocation = location.geometry.coordinates.reverse()
      this.searchFocused = false
    },
    boundsChange(bounds) {
      this.searchBounds = bounds
    },
    blurLater() {
      setTimeout(() => {
        this.searchFocused = false
      }, 100)
    },
    setSuggest(name, location) {
      this.searchInput = name
      this.searchLocation = location
    }
  },

  watch: {
    searchInput() {
      if (this.searchInput === '') {
        this.searchLocation = undefined
      }
      this.$store.dispatch('pioupious/searchLocation', { query: this.searchInput })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  .search-highlight {
    padding: 0.75rem;

    a {
      color: $primary;
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

  ul.autocomplete {
    position: absolute;
    width: 100%;
    background: $white;
    margin-top: -1px;
    border: 1px solid $white;
    max-height: 25vh;
    overflow: auto;
    padding-top: 0.3em;
    border-color: black;
    border-radius: 3px;

    li {
      padding: 0.2em 0.5em;
      font-size: 0.92rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &, strong, small {
        color: $body-background;
      }

      &:hover {
        background: $white-ter;
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }

  section > div.columns {
    min-height: 90%;
  }

  .control.has-icon .icon {
    pointer-events: initial;
    cursor: pointer;
  }

  .fixed-header {
    position: fixed;
    width: 100vw;
    z-index: 999;
  }

  nav.fixed-header + .columns {
    margin-top: 3.25rem;
  }

  .fixed-header.mini-map-container + .column {
    padding-top: 180px;
  }

  span.icon {
    color: $grey;
    vertical-align: middle;
    height: 100%;
    i.fa {
      font-size: 2em;
    }
  }
</style>
