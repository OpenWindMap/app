<template lang="html">
  <nav class="nav has-shadow">
    <div class="nav-left">
      <a class="nav-item">
        <img src="~static/img/pioupiou-logo.svg" alt="Pioupiou logo">
      </a>
    </div>

    <div class="nav-right nav-menu">
      <template v-for="route in routes">
        <router-link :to="route.path || { 'name': route.name }" class="nav-item">
          {{ route.name || route.path }}
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script lang="buble">
export default {
  name: 'nav-bar',

  props: {
    routes: {
      type: Array,
      validator: array => array.length === 0 || (array.length > 0 && array.every(obj => 'name' in obj || 'path' in obj))
    }
  }
}
</script>

<style lang="scss" scoped>
  nav {
    margin-bottom: 1em;
  }
</style>
