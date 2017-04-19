<template lang="html">
  <section>
    <div class="columns">
      <div class="column">
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <img src="~static/img/pioupiou-logo.svg" alt="Pioupiou logo">
              </div>
              <div class="is-pulled-right">
                <small>
                  <strong>Version 0.4.0</strong> - beta
                </small>
              </div>
            </div>
          </header>
        </div>
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <translate tag="strong">Units</translate> <br>
                <translate tag="small">Units available</translate>
              </div>
              <div class="is-pulled-right">
                <div class="field has-addons">
                  <p class="control" v-for="(unit, key) in $convert.available">
                    <a @click="changeUnit(key)"
                      :class="['button is-small is-primary', $convert.current === key ? '' : 'is-outlined is-inverted']">
                      <span>{{ unit }}</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <translate tag="strong">Language</translate> <br>
                <translate tag="small">Choose your language</translate>
              </div>
              <div class="is-pulled-right">
                <div class="field has-addons">
                  <p class="control" v-for="(language, key) in $language.available">
                    <a @click="changeLanguage(key)"
                      :class="['button is-small is-primary', $language.current === key ? '' : 'is-outlined is-inverted']">
                      <span>{{ language }}</span>
                    </a>
                  </p>
                  <p class="control">
                    <a @click="moreLanguage"
                      class="button is-small is-primary is-outlined is-inverted">
                      <i class="fa fa-plus"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <translate tag="strong">Support</translate> <br>
                <translate tag="small">Need some help ?</translate>
              </div>
              <div class="is-pulled-right">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-small is-primary is-outlined is-inverted"
                      href="https://pioupiou.fr/en/support" target="_blank">
                      <translate>Contact us</translate>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <translate tag="strong">Open Data</translate> <br>
                <translate tag="small">Data are free for everyone !</translate>
              </div>
              <div class="is-pulled-right">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-small is-primary is-outlined is-inverted"
                      href="http://developers.pioupiou.fr" target="_blank">
                      <translate>Consult it</translate>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <translate tag="strong">Privacy</translate> <br>
                <translate tag="small">Our Privacy Policy</translate>
              </div>
              <div class="is-pulled-right">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-small is-primary is-outlined is-inverted"
                      href="https://pioupiou.fr/en/privacy-and-cookies" target="_blank">
                      <translate>Inquire</translate>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <translate tag="strong">Terms of Use</translate> <br>
                <translate tag="small">Our Terms and Conditions of Use</translate>
              </div>
              <div class="is-pulled-right">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-small is-primary is-outlined is-inverted"
                      href="https://pioupiou.fr/en/terms-of-use" target="_blank">
                      <translate>Look at</translate>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <translate tag="strong">Help us!</translate> <br>
                <translate tag="small">Help us on the beta</translate>
              </div>
              <div class="is-pulled-right">
                <div class="field has-addons">
                  <p class="control">
                    <a @click="repportBug"
                      class="button is-small is-primary is-outlined is-inverted">
                      <translate>Report a bug</translate>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div class="card">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left" style="max-width: 100%;">
                <translate tag="strong">Credits</translate> <br>

                <small>
                  <translate>All map credits goes to</translate>
                  <a href="http://leafletjs.com">Leaflet</a>
                  <translate tag="small"> and </translate>
                  <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors
                </small>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="buble">
import Raven from 'raven-js'

export default {
  name: 'more-view',

  data() {
    return {
      data: []
    }
  },

  methods: {
    changeLanguage(lang) {
      this.$store.dispatch('user/setLang', { lang })
    },
    changeUnit(unit) {
      this.$store.dispatch('user/setUnit', { unit })
    },
    moreLanguage() {
      Raven.captureMessage('Hit the more language button', {
        level: 'info',
        tags: {
          'missing feature': 'language addition'
        }
      })
    },
    repportBug() {
      Raven.captureMessage('Generic bug reports', {
        level: 'warning'
      })
      Raven.showReportDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  .columns {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;

    .column {
      padding: 0;

      &:last-child {
        padding-bottom: 3rem;
      }
    }

    &:last-child {
      margin-bottom: initial;
    }
  }

  .card {
    box-shadow: initial;
    border-top: 1px solid rgba(10, 10, 10, 0.1);

    &:last-child {
      border-bottom: 1px solid rgba(10, 10, 10, 0.1);
    }

    .card-header {
      padding: 12px 12px 0px;
      box-shadow: initial;

      .title {
        margin-bottom: 0;
      }

      .is-pulled-left {
        max-width: 75%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .is-pulled-right {
        line-height: 1.9rem;
      }

      .field.has-addons {
        margin-top: 5px;
      }
    }
  }

  small > a {
    color: $primary;
    text-decoration: underline;
  }

  img {
    width: 7em;
  }
</style>
