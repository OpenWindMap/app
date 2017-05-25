<template lang="html">
  <header>
    <div class="tabs is-fullwidth">
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.name ? { 'name': route.name } : route.path">
            <span class="icon"><i :class="`fa fa-${ route.icon || 'map-signs' }`"></i></span>
            <span>{{ route.label() || route.name || route.path }}</span>
          </router-link>
        </li>
        <li>
          <a @click="rotateUnit">
            <span class="text-icon">
              <strong>{{ $pgettext('Units label', $convert.currentLabel) }}</strong>
            </span>
            <translate tag="span" translate-context="Footer unit chooser">Unit</translate>
          </a>
        </li>
      </ul>
    </div>
  </header>
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

  header {
    @include touch {
      height: 60px;
    }
  }

  .tabs {

    ul {
      border-bottom: initial;
      border-top: 1px solid $light;

      li {
        flex-shrink: 1;
        flex-basis: 0;

        &:last-child {
          border-left: 1px solid $light;
          background: $dark;
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

      &:not(.router-link-active) {
        background: $dark;
      }
    }

    .icon {
      &:first-child {
        margin-right: 0;
      }

      .fa.fa-map-o {
        font-weight: bold;
      }
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
    }
  }
</style>
