<template lang="html">
  <section>
    <nav class="nav has-shadow fixed-header">
      <div class="field is-fullwidth nav-item">
        <p class="control is-fullwidth has-icon has-icon-right">
          <input class="input" type="text" :placeholder="`${ $pgettext('Search field placeholder', 'Search...') }`"
            v-model="searchInput" @focus="searchFocused = true" @blur="blurLater">
          <span class="icon">
            <i class="fa fa-remove" v-if="searchInput !== ''" @click="searchInput = ''"></i>
            <i class="fa fa-search" v-else></i>
          </span>
          <ul class="autocomplete" v-show="searchFocused && (locationResult.length > 0 || preSearchResults.length > 0)">
            <li v-for="pioupiou in preSearchResults.slice(0, 3)" v-if="pioupiou !== undefined" @click="show(pioupiou)">
              <strong>{{ pioupiou.meta && pioupiou.meta.name || $gettext('Unnamed Pioupiou') }}</strong>
              <small>(Pioupiou #{{ pioupiou.id }})</small>
            </li>
            <li v-for="location in locationResult" v-if="location !== undefined" @click="searchIn(location)">
              <strong>{{ location.properties.name }}</strong><small>, {{ location.properties.region }}</small>
              <small v-if="location.properties.source === 'paraglidingearth-beta'"><translate>(Paragliding)</translate></small>
              <small v-if="location.properties.source === 'ffvl-beta'"><translate>(Kitesurf)</translate></small>
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
          <translate translate-context="Search examples title">Suggestions:</translate>
        </h6>
        <ul>
          <li><a @click="setSuggest('Chamonix-Mont-Blanc, Haute-Savoie', [45.922169, 6.915194])">
            Chamonix
          </a></li>
          <li><a @click="setSuggest('Biarritz, Pyrénées-Atlantiques', [43.482436, -1.559570])">
            Biarritz
          </a></li>
          <li><a @click="setSuggest('Gruissan, Aude', [43.106910, 3.091364])">
            Gruissan
          </a></li>
          <li><a @click="setSuggest('Dune du Pyla, Gironde', [44.582625, -1.221854])">
            Dune du Pyla
          </a></li>
          <li><a @click="setSuggest('Dent de Crolles, Isère', [45.308051, 5.855160])">
            Dent de Crolles
          </a></li>
        </ul>
        <!--<br>
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
        </ul>-->
      </div>
      <div class="column columns" v-else>

        <div class="column mini-map-container" v-if="searchLocation">
          <map-content :zoom="9" :map-markers="searchResults.length ? searchResults : undefined" :center="searchLocation"
            @bounds-change="boundsChange" @marker-click="show">
          </map-content>
        </div>

        <div class="column" v-if="searchResults.length && searchLocation">
          <template v-for="pioupiou in searchResults">
            <station-overview v-if="pioupiou !== undefined"
              :key="pioupiou.id" :station="pioupiou"
              :opened="opened === pioupiou.id" @open="show" @show="show">
            </station-overview>
            <div class="column has-text-centered" v-else>
              <span class="icon">
                <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </span>
            </div>
          </template>
        </div>
        <div class="column has-text-centered" v-else>
          <br><br>
          <span class="icon">
            <translate>No result found</translate>
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
import { throttle } from 'lodash'

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
      highlights: [],
      locationResult: [],
      lastSearch: undefined
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
      this.searchFocused = false
      this.searchInput = `${location.properties.name}, ${location.properties.region}`
      this.searchLocation = location.geometry.coordinates.reverse()
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
    },
    centerChange(center) {
      throttle(() => {
        this.$http.get(`http://api-search.pioupiou.fr/v1/reverse?point.lat=${center.lat}&point.lon=${center.lng}&size=1`)
        .then(({ body: response }) => {
          const location = response.features[0]
          this.searchInput = (location.properties.locality) ?
            `${location.properties.locality}, ${location.properties.country}` :
            (location.properties.macroregion) ?
            `${location.properties.macroregion}, ${location.properties.country}` :
            `${location.properties.region}, ${location.properties.country}`
        })
      }, 6000)()
    }
  },

  watch: {
    searchInput() {
      if (this.searchInput === '') {
        this.searchLocation = undefined
        this.locationResult = []
      }

      if (this.searchInput === this.lastSearch) {
        return
      }

      this.lastSearch = this.searchInput

      if (!this.searchFocused || this.searchInput.length < 3) return

      console.log('Search ' + this.searchInput)

      this.$http.get(`http://api-search.pioupiou.fr/v1/autocomplete?text=${this.searchInput}`)
        .then(({ body: response }) => {
          if (this.searchInput !== response.geocoding.query.text) return
          this.locationResult = response.features
        })

        // TODO : reimplement geoloc

      /* let geoloc = ''

      // TODO : utiliser le throttle ici à la place de lodash : http://stackoverflow.com/questions/3963299/jquery-auto-complete-request-throttling

      const getIt = throttle(() => {
        this.$http.get(`http://137.74.25.60:3100/v1/autocomplete?text=${this.searchInput}${geoloc}`)
        .then(({ body: response }) => {
          if (this.searchInput !== response.geocoding.query.text) return
          this.locationResult = response.features
          console.log(this.locationResult)
        })
      }, 400)

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          geoloc = `&focus.point.lat=${position.coords.latitude}&focus.point.lon=${position.coords.longitude}`
          getIt()
        }, () => getIt())
      } else {
        getIt()
      } */
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  .search-highlight {
    padding: 0.75em;

    a {
      color: $primary;
    }

    .subtitle {
      margin-bottom: 0.9em;
      margin-left: 0;
    }

    li {
      line-height: 30px;
    }

    hr {
      margin: 1.5rem 1.5em;
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
        padding-bottom: 3em;
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
      font-size: 0.92em;
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
  }

  nav.fixed-header + .columns {
    margin-top: 3.25em;
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

  .control span.icon i.fa {
    font-size: 21px;
  }

  span.icon {
    width: initial;
  }
</style>
