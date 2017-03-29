<template lang="html">
  <footer>
    <div class="tabs is-fullwidth">
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.path || { 'name': route.name }">
            <span class="icon"><i :class="`typcn typcn-${ route.icon || 'directions' }`"></i></span>
            <span>{{ route.name || route.path }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="buble">
export default {
  name: 'tabs-footer',

  props: {
    routes: {
      type: Array,
      required: true,
      validator: array => array.length > 0 && array.every(obj => 'name' in obj || 'path' in obj)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/variables";
  @import "~bulma/sass/utilities/mixins";

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;

    @include touch {
      height: 8vw;
      min-height: 8vh;
    }
  }

  .tabs {
    &, ul, li, a {
      height: 100%;
    }

    ul {
      border-bottom: initial;
      border-top: 1px solid #dbdbdb;
    }

    span {
      font-size: 0.8rem;
      margin-top: 0.4rem;
      font-weight: 300;
    }

    a {
      border-bottom: initial;
      flex-direction: column;
      padding-top: 0.9rem;
    }

    .icon {
      font-size: 24px;

      &:first-child {
        margin-right: 0;
        margin-bottom: 0.3rem;
      }
    }
  }
</style>
