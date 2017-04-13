<template lang="html">
  <footer>
    <div class="tabs is-fullwidth">
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.path || { 'name': route.name }">
            <span class="icon"><i :class="`fa fa-${ route.icon || 'map-signs' }`"></i></span>
            <span>{{ route.label || route.name || route.path }}</span>
          </router-link>
        </li>
        <li>
          <a @click="rotateUnit">
            <span class="icon">
              <strong>{{ $convert.currentLabel }}</strong>
            </span>
            <span>Unit</span>
          </a>
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
  },

  methods: {
    rotateUnit() {
      this.$store.commit('user/rotateUnit')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";
  @import "~bulma/sass/utilities/variables";
  @import "~bulma/sass/utilities/mixins";

  footer {
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
      border-top: 1px solid $grey-lighter;

      li {
        flex-shrink: 1;
        flex-basis: 0;

        &:last-child {
          border-left: 1px solid $grey-lighter;
          background: $white-bis;
        }
      }
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

      &.router-link-active {
        box-shadow: inset 2px 0px 8px rgba(10, 10, 10, 0.1), inset -2px 0px 8px rgba(10, 10, 10, 0.1);
        border-left: 1px solid $grey-lighter;
        background: $white-ter;
      }
    }

    .icon {
      &:first-child {
        margin-right: 0;
        margin-bottom: 0.3rem;
      }

      .fa.fa-map-o {
        font-weight: bold;
      }

      strong {
        text-transform: uppercase;
        font-size: 1.1em;
      }
    }
  }
</style>
