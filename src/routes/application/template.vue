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
          <h3 class="has-text-centered">Ow no ...</h3>
          <p>
            Looks like you are running the app without any connection. <br>
            However during the beta, an internet connection is required to run the Pioupiou application. <br>
            <br>
            We are sorry about this issue and work hard on offline capabilites. <br>
            <br>
            Cheers, <br>
            <strong>The Pioupiou Team.</strong>
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
  }
</style>
