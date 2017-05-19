<template lang="html">
  <div id="app">
    <!-- <nav-bar :routes="desktopRoutes" class="is-hidden-touch"/> -->

    <div class="notification is-danger" v-if="offlineMode">
      <translate translate-context="Offline alert message content">
        Offline mode
      </translate>
    </div>

    <section class="columns">
      <div class="column is-two-thirds">
        <keep-alive>
          <all-in-map></all-in-map>
        </keep-alive>
      </div>
      <div class="column is-one-third">
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

import TabsFooter from '@/components/tabs-footer'
import NavBar from '@/components/nav-bar'
import allInMap from '@/components/all-in-map-content'

export default {
  name: 'pioupiou-app',

  components: { TabsFooter, NavBar, allInMap },

  data() {
    return {
      connectionType: 'unknow',
      cordova: false
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

      this.set(this, 'cordova', true)

      document.body.className = window.device.platform.toLowerCase()
    }
  },

  mounted() {
    document.addEventListener('offline', this.getConnectionType)
    document.addEventListener('online', this.getConnectionType)
    document.addEventListener('deviceready', this.deviceready)
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
