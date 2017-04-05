<template lang="html">
  <div id="app">
    <nav-bar :routes="desktopRoutes" class="is-hidden-touch"/>

    <router-view></router-view>

    <tabs-footer :routes="mobileRoutes" class="is-hidden-desktop"/>
  </div>
</template>

<script lang="buble">
import TabsFooter from '@/components/tabs-footer'
import NavBar from '@/components/nav-bar'

export default {
  name: 'pioupiou-app',

  components: { TabsFooter, NavBar },

  data() {
    return {}
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
      overflow: auto;
    }
  }

  .is-fullwidth {
    width: 100%;
  }
</style>
