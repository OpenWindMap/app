<template>
  <footer>
    <div class="tabs is-fullwidth">
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.path || { 'name': route.name }">
            <span class="icon"><i :class="`fa fa-${ route.icon || 'map-signs' }`"></i></span>
            <span>{{ route.label() || route.name || route.path }}</span>
          </router-link>
        </li>
        <li>
          <a @click="rotateUnit">
            <span class="text-icon">
              <strong>{{ $convert.currentLabel }}</strong>
            </span>
            <translate tag="span" translate-context="Footer unit chooser">Unit</translate>
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
      this.$store.dispatch('user/rotateUnit')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";
  @import "~bulma/sass/utilities/variables";
  @import "~bulma/sass/utilities/mixins";

  footer {
    height: 60px;
    min-height: 60px;
    max-height: 60px;
  }

  .tabs {
    &, ul, li, a {
      height: 100%;
    }

    ul {
      border-bottom: initial;
      border-top: 1px solid $dark;

      li {
        flex-shrink: 1;
        flex-basis: 0;

        &:last-child {
          border-left: 1px solid $dark;
          background: $light;
        }
      }
    }

    span {
      font-size: 0.8em;
      font-weight: 300;
      text-align: center;
    }

    a {
      border-bottom: initial;
      flex-direction: column;
      text-align: center;
      padding: 0.5em 0.5em;

      &.router-link-active {
        box-shadow: inset 2px 0px 8px rgba(10, 10, 10, 0.1), inset -2px 0px 8px rgba(10, 10, 10, 0.1);
        background: $light;
      }
    }

    .icon {
      &:first-child {
        margin-right: 0;
      }

      .fa.fa-map-o {
        font-weight: bold;
      }

      display: block;
    }

    strong {
      text-transform: uppercase;
      text-align: center;
      font-size: 1.1em;
    }

    .text-icon {
      align-items: center;
      display: inline-flex;
      line-height: 24px;
      display: block;
    }
  }
</style>
