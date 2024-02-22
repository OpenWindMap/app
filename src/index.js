import 'tocca'

import Vue from 'vue'
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

// Raven must me initialized before the other modules
// Raven.config('https://e375c29c0c6b4af8bcdf725b44f302bb@sentry.io/165583')
// .addPlugin(RavenVue, Vue)
// .install()

// window.Raven = Raven

import { locale, convert } from '@/locale'
import router from '@/routes'
import http from '@/resources/http'
import store from '@/store'
import filters from '@/filters'

import App from '@/routes/application/template.vue'

new Vue({
  el: 'openwindmap-app',
  components: { App },

  render: h => h('app'),

  router,
  locale,
  http,
  store,
  filters,
  convert
})

store.dispatch('user/syncTime')
store.dispatch('user/restoreStore')
if (store.state.user.positionWatch) store.dispatch('user/watchPosition')

window.Vue = Vue
