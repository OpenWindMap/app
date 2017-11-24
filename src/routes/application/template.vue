<template lang="html">
  <div id="app">
    <!-- <nav-bar :routes="desktopRoutes" class="is-hidden-touch"/>-->

    <div class="notification is-danger" v-if="offlineMode">
      <translate translate-context="Offline alert message content">
        Offline mode
      </translate>
    </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <tabs-footer :routes="mobileRoutes"/>
    <!-- <tabs-footer :routes="mobileRoutes" class="is-hidden-desktop"/>-->

  </div>
</template>

<script lang="buble">
import Raven from 'raven-js'

import TabsFooter from '@/components/tabs-footer'
import NavBar from '@/components/nav-bar'

import { init as analytics } from '@/plugins/analytics'

export default {
  name: 'pioupiou-app',

  components: { TabsFooter, NavBar },

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

      this.$store.dispatch('user/watchPosition')
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

    this.$store.dispatch('user/watchPosition')
  }
}
</script>

<style lang="scss">
  @import "~src/assets/vars";
  @import '~bulma';
  @import '~font-awesome/scss/font-awesome';

  html, body {
    overflow: auto;
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100%;

    > section {
      position: relative;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  .is-fullwidth {
    width: 100%;
  }

  .modal .modal-content {
    max-height: 80%;
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

  input,
  textarea,
  [contenteditable] {
      -webkit-user-select: text !important;
      user-select: text !important;
  }

  #app .notification {
    margin: 0;
    padding: 0.4em 1em;
    font-size: 0.9em;
    border-radius: 0;
  }

  .sentry-error-embed header h2 > span {
    display: inline !important;
  }
</style>
