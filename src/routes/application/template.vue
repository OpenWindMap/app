<template lang="html">
  <div id="app">
    <nav-bar :routes="desktopRoutes" class="is-hidden-touch"/>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <tabs-footer :routes="mobileRoutes" class="is-hidden-desktop"/>

    <div :class="['modal', offlineMode ? 'is-active' : '']">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box content">
          <h3 class="has-text-centered">
            <translate translate-context="Offline alert message title">Ow no ..</translate>
          </h3>
          <translate tag="p" translate-context="Offline alert message content">
            Looks like you are running the app without any connection.
          </translate>
          <translate tag="p" translate-context="Offline alert message content">
            However during the beta, an internet connection is required to run the Pioupiou application.
          </translate>
          <br>
          <translate tag="p" translate-context="Offline alert message content">
            We are sorry about this issue and work hard on offline capabilites.
          </translate>
          <br>
          <translate tag="p" translate-context="Offline alert message content">
            Cheers,
          </translate>
          <p>
            <translate tag="strong" translate-context="Offline alert message author">The Pioupiou Team.</translate>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="buble">
import TabsFooter from '@/components/tabs-footer'
import NavBar from '@/components/nav-bar'

export default {
  name: 'pioupiou-app',

  components: { TabsFooter, NavBar },

  data() {
    return {
      connectionType: 'unknow'
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
    }
  },

  mounted() {
    document.addEventListener('offline', this.getConnectionType)
    document.addEventListener('online', this.getConnectionType)

    const systemLanguage = navigator.language.split('-')[0]
    if (systemLanguage in this.$language.available) {
      this.$store.dispatch('user/setLang', { lang: systemLanguage })
    }
  }
}
</script>

<style lang="scss">
  @import "~src/assets/vars";
  @import '~bulma';
  @import '~font-awesome/scss/font-awesome';

  html, body {
    overflow: hidden;
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
</style>
