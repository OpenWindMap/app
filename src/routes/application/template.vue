<template lang="html">
  <div>
    <router-view></router-view>
    <tabs-footer :routes="routes"/>
  </div>
</template>

<script lang="buble">
import TabsFooter from '@/components/tabs-footer'

export default {
  name: 'pioupiou-app',

  components: { TabsFooter },

  data() {
    return {
      routes: this.$router.options.routes.filter(route => route.nav)
    }
  }
}
</script>

<style lang="scss">
  @import "~src/assets/vars";
  @import '~bulma';

  html, body {
    overflow: hidden;
  }
</style>
