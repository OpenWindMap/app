<template lang="html">
  <div id="app">
    <!-- <nav-bar :routes="desktopRoutes" class="is-hidden-touch"/> -->

    <div class="notification is-danger" v-if="offlineMode">
      <translate translate-context="Offline alert message content">
        Offline mode
      </translate>
    </div>

    <section class="columns">
      <div class="column is-two-thirds is-hidden-touch">
        <keep-alive>
          <all-in-map></all-in-map>
        </keep-alive>
      </div>
      <div class="column is-one-third">
        <tabs-header :routes="desktopRoutes" class="is-hidden-touch"/>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </section>

    <tabs-footer :routes="mobileRoutes" class="is-hidden-desktop"/>

  </div>
</template>

<script lang="buble">
import Raven from 'raven-js'

import { focus } from 'vue-focus'

import TabsFooter from '@/components/tabs-footer'
import TabsHeader from '@/components/tabs-header'
import NavBar from '@/components/nav-bar'
import allInMap from '@/components/all-in-map-content'

import { init as analytics } from '@/plugins/analytics'

export default {
  name: 'pioupiou-app',

  components: { TabsFooter, TabsHeader, NavBar, allInMap },
  directives: { focus },

  data() {
    return {
      connectionType: 'unknow',
      cordova: false,
      ga: () => {}
    }
  },

  computed: {
    routes() {
      return this.$router.options.routes.filter(route => route.nav)
    },
    mobileRoutes() {
      return this.routes.filter(route => !route.desktop)
    },
    desktopRoutes() {
      return this.routes.filter(route => !route.mobile)
    },
    offlineMode() {
      return (this.connectionType === 'none')
    },
    inSearch() {
      return this.$route.name === 'search'
    }
  },

  methods: {
    getConnectionType() {
      if ('connection' in navigator) {
        this.connectionType = navigator.connection.type
      } else {
        this.connectionType = 'unknow'
      }
    },
    deviceready() {
      Raven.setExtraContext({
        device: window.device || {}
      })
      // this.set(this, 'cordova', true)
      this.cordova = true
      document.body.className = window.device.platform.toLowerCase()

      // TODO stocker les ID dans un fichier de conf
      window.AppRate.preferences.storeAppURL = {
        ios: '1235894756',
        android: 'market://details?id=tech.altostratus.pioupiou'
      }

      // TODO brancher à gettext à la place de apprate useLanguage
      /* AppRate.preferences.customLocale = {
        title: "Rate %@",
        message: "If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",
        cancelButtonLabel: "No, Thanks",
        laterButtonLabel: "Remind Me Later",
        rateButtonLabel: "Rate It Now"
      } */

      window.AppRate.preferences.useLanguage = this.$store.state.user.lang
      window.AppRate.promptForRating(false)
    },
    searchFocused() {
      this.$router.push({ name: 'search', params: { autoFocus: true } })
    }
  },

  mounted() {
    document.addEventListener('offline', this.getConnectionType)
    document.addEventListener('online', this.getConnectionType)
    document.addEventListener('deviceready', this.deviceready)

    window.ga = analytics()

    window.ga('set', {
      page: this.$route.path,
      title: this.$route.name
    })
    window.ga('send', 'pageview')

    this.$router.afterEach((to, from) => {
      window.ga('set', {
        page: to.path,
        title: to.name
      })
      window.ga('send', 'pageview')
    })
  }
}
</script>

<style lang="scss">
  @import "~src/assets/vars";
  @import '~bulma';
  @import '~font-awesome/scss/font-awesome';

  html, body {
    overflow: auto;
  }

  #app > section > .column.is-one-third {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;

    > section {
      position: relative;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    > .columns,
    > .columns > .column {
      margin: 0;
      padding: 0;
      height: 100%;
    }
  }

  .is-fullwidth {
    width: 100%;
  }

  .modal .modal-content {
    max-height: 80vh;

    .content p {
      margin-bottom: 0;
    }
  }

  * {
    user-select: none;
    touch-callout: none;
    user-drag: none;
  }

  input {
    user-select: auto !important;
  }

  #app .notification {
    margin: 0;
    padding: 0.4em 1em;
    font-size: 0.9em;
  }

  .sentry-error-embed header h2 > span {
    display: inline !important;
  }
</style>
