<template>
  <section>
    <div class="columns">
      <div class="column">
        <div class="card">
          <a href="https://forum.openwindmap.org/topic/20/1" target="_blank">
            <header class="card-header">
              <div class="is-clearfix is-fullwidth">
                  <div class="is-pulled-left">
                    <span class="icon">
                      <i class="fa fa-book"></i>
                    </span> &nbsp;
                    <translate tag="strong">What is OpenWindMap?</translate> <br>
                    <!-- <translate tag="small">Brief about Pioupiou</translate> -->
                  </div>
                  <div class="is-pulled-right">
                    <span class="icon">
                      <i class="fa fa-external-link"></i>
                    </span>
                  </div>
              </div>
            </header>
          </a>
        </div>
        <div class="card">
          <a href="https://forum.openwindmap.org/topic/160/1" target="_blank">
            <header class="card-header">
              <div class="is-clearfix is-fullwidth">
                <div class="is-pulled-left">
                  <span class="icon">
                    <i class="fa fa-plus"></i>
                  </span> &nbsp;
                  <translate tag="strong">Install a station</translate> <br>
                </div>
                <div class="is-pulled-right">
                  <span class="icon">
                    <i class="fa fa-external-link"></i>
                  </span>
                </div>
              </div>
            </header>
          </a>
        </div>
        <div class="card">
          <a href="https://forum.openwindmap.org/category/43/app-android-ios" target="_blank">
            <header class="card-header">
              <div class="is-clearfix is-fullwidth">
                <div class="is-pulled-left">
                  <span class="icon">
                    <i class="fa fa-commenting-o"></i>
                  </span> &nbsp;
                  <translate tag="strong">Feedback</translate> <br>
                </div>
                <div class="is-pulled-right">
                  <span class="icon">
                    <i class="fa fa-external-link"></i>
                  </span>
                </div>
              </div>
            </header>
          </a>
        </div>
        <div class="card">
          <a href="https://forum.openwindmap.org" target="_blank">
            <header class="card-header">
              <div class="is-clearfix is-fullwidth">
                <div class="is-pulled-left">
                  <span class="icon">
                    <i class="fa fa-users"></i>
                  </span> &nbsp;
                  <translate tag="strong">Forum</translate> <br>
                  <!-- <translate tag="small">Contact us</translate> -->
                </div>
                <div class="is-pulled-right">
                  <span class="icon">
                    <i class="fa fa-external-link"></i>
                  </span>
                </div>
              </div>
            </header>
          </a>
        </div>
        <div class="card">
          <a href="https://github.com/OpenWindMap/app" target="_blank">
            <header class="card-header">
              <div class="is-clearfix is-fullwidth">
                <div class="is-pulled-left">
                  <span class="icon">
                    <i class="fa fa-github"></i>
                  </span> &nbsp;
                  <translate tag="strong">Contribute to this app</translate> <br>
                  <!-- <translate tag="small">Data are free for everyone !</translate> -->
                </div>
                <div class="is-pulled-right">
                  <span class="icon">
                    <i class="fa fa-external-link"></i>
                  </span>
                </div>
              </div>
            </header>
          </a>
        </div>
        <div class="card">
          <a href="https://developers.pioupiou.fr" target="_blank">
            <header class="card-header">
              <div class="is-clearfix is-fullwidth">
                <div class="is-pulled-left">
                  <span class="icon">
                    <i class="fa fa-database"></i>
                  </span> &nbsp;
                  <translate tag="strong">Open-data</translate> <br>
                </div>
                <div class="is-pulled-right">
                  <span class="icon">
                    <i class="fa fa-external-link"></i>
                  </span>
                </div>
              </div>
            </header>
          </a>
        </div>
        <div class="card">
          <header class="card-header" @click="open('settings')">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <span class="icon">
                  <i class="fa fa-sliders"></i>
                </span> &nbsp;
                <translate tag="strong">Settings</translate> <br>
                <!-- <translate tag="small">Available settings</translate> -->
              </div>
              <div class="is-pulled-right">
                <span class="icon">
                  <i class="fa fa-chevron-down" v-if="opened === 'settings'"></i>
                  <i class="fa fa-chevron-right" v-else></i>
                </span>
              </div>
            </div>
          </header>
          <div :class="['card-content', opened === 'settings' ? '' : 'is-hidden']">
            <div class="content">
              <div class="card">
                <header class="card-header">
                  <div class="is-clearfix is-fullwidth">
                    <div class="is-pulled-left">
                      <translate tag="strong">Units</translate> <br>
                      <!-- <translate tag="small">Units available</translate> -->
                    </div>
                    <div class="is-pulled-right">
                      <div class="field has-addons">
                        <p class="control" v-for="(unit, key) in $convert.available">
                          <a @click="changeUnit(key)"
                            :class="['button is-small is-primary', $convert.current === key ? '' : 'is-inverted is-outlined']">
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
                      <!-- <translate tag="small">Choose your language</translate> -->
                    </div>
                    <div class="is-pulled-right">
                      <div class="field">
                        <p class="control" v-for="(language, key) in $language.available">
                          <a @click="changeLanguage(key)"
                            :class="['button is-small is-primary wide', $language.current === key ? '' : 'is-outlined is-inverted']">
                            <span>{{ language }}</span>
                          </a><br />
                        </p>
                        <!--<p class="control">
                          <a @click="moreLanguage"
                            class="button is-small is-primary is-outlined is-inverted">
                            <i class="fa fa-plus"></i>
                          </a>
                        </p>-->
                      </div>
                    </div>
                  </div>
                </header>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <header class="card-header" @click="open('legal')">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <span class="icon">
                  <i class="fa fa-gavel"></i>
                </span> &nbsp;
                <translate tag="strong">Legal</translate> <br>
                <!-- <translate tag="small">Legal things</translate> -->
              </div>
              <div class="is-pulled-right">
                <span class="icon">
                  <i class="fa fa-chevron-down" v-if="opened === 'legal'"></i>
                  <i class="fa fa-chevron-right" v-else></i>
                </span>
              </div>
            </div>
          </header>
          <div :class="['card-content', opened === 'legal' ? '' : 'is-hidden']">
            <div class="content">
              <div class="card">
                <a href="https://forum.openwindmap.org/post/3258" target="_blank">
                  <header class="card-header">
                    <div class="is-clearfix is-fullwidth">
                      <div class="is-pulled-left">
                        <translate tag="strong">Privacy Policy</translate> <br>
                      </div>
                      <div class="is-pulled-right">
                        <span class="icon">
                          <i class="fa fa-external-link"></i>
                        </span>
                      </div>
                    </div>
                  </header>
                </a>
              </div>
              <div class="card">
                <a href="https://forum.openwindmap.org/post/3257" target="_blank">
                  <header class="card-header">
                    <div class="is-clearfix is-fullwidth">
                      <div class="is-pulled-left">
                        <translate tag="strong">About us</translate> <br>
                      </div>
                      <div class="is-pulled-right">
                        <span class="icon">
                          <i class="fa fa-external-link"></i>
                        </span>
                      </div>
                    </div>
                  </header>
                </a>
              </div>
              <!---<div class="card">
                <a href="https://pioupiou.fr/en/terms-of-use" target="_blank">
                  <header class="card-header">
                    <div class="is-clearfix is-fullwidth">
                      <div class="is-pulled-left">
                        <translate tag="strong">Terms of Use</translate> <br>
                      </div>
                      <div class="is-pulled-right">
                        <span class="icon">
                          <i class="fa fa-external-link"></i>
                        </span>
                      </div>
                    </div>
                  </header>
                </a>
              </div>-->
              <div class="card">
                <header class="card-header">
                  <div class="is-clearfix is-fullwidth">
                    <div class="is-pulled-left no-limit">
                      <translate tag="strong">Attributions</translate> <br>
                      <p class="control">
                        <small>
                          <translate>Cartographic data © OpenStreetMap contributors</translate>
                          <br>
                          <translate>Paragliding spots © ParaglidingEarth</translate>
                          <br>
                          <translate>Kitesurfing spots © FFVL</translate>
                          <br>
                          <translate>Open-source softwares: VueJS, Leaflet, Cordova, Pelias, Bulma, FontAwesome, NodeJS and many others</translate>
                        </small>
                      </p>
                    </div>
                  </div>
                </header>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="card">
          <header class="card-header" style="padding-bottom: 0px;">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left">
                <img src="/img/pioupiou-logo.svg" class="inverted" alt="Pioupiou logo">
              </div>
              <div class="is-pulled-right">
                <small>
                  <strong>Version 1.1.2</strong>
                </small>
              </div>
            </div>
          </header>
        </div> -->
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
      data: [],
      opened: undefined
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
    reportBug() {
      Raven.captureMessage('Generic bug reports', {
        level: 'warning'
      })
      Raven.showReportDialog()
    },
    open(label) {
      this.opened = this.opened === label ? undefined : label
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
        padding-bottom: 3em;
      }
    }

    &:last-child {
      margin-bottom: initial;
    }
  }

  .card {
    box-shadow: initial;
    border-top: 1px solid rgba(10, 10, 10, 0.1);
    background-color: initial;

    &:last-child {
      border-bottom: 1px solid rgba(10, 10, 10, 0.1);
    }

    .card-header {
      padding: 12px;
      box-shadow: initial;
      min-height: 62px;

      .title {
        margin-bottom: 0;
      }

      .is-pulled-left {
        max-width: 75%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        vertical-align: middle;
        line-height: 1.9em;
      }
      .is-pulled-left.no-limit {
        max-width: 100%;
        text-overflow: initial;
        overflow: initial;
        white-space: initial;
        vertical-align: initial;
        line-height: initial;
      }

      .is-pulled-right {
        line-height: 1.9em;

        .icon {
          vertical-align: middle;
        }
      }

      .field.has-addons {
        margin-top: 5px;
      }
    }

    .card-content {
      padding: 0;
      box-shadow: inset 0px 2px 8px rgba(10, 10, 10, 0.1), inset 0px -2px 8px rgba(10, 10, 10, 0.1);
      background: $light;

      .card-header {
        padding: 12px 12px 0px;
      }
    }

    p.control {
      margin-bottom: 1em;
    }
  }

  small > a {
    color: $title;
    text-decoration: underline;
  }

  .icon, a {
    color: $title;
  }

  .is-outlined {
    color: $title !important;
    border-color: $title !important;
  }

  img {
    width: 7em;
  }

  .fa.fa-external-link {
    font-weight: bold;
  }

  .button.wide {
    width: 150px;
  }
</style>
