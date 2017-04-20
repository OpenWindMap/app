import Vue from 'vue'
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

import { locale, convert } from '@/locale'
import router from '@/routes'
import http from '@/resources/http'
import store from '@/store'
import filters from '@/filters'

import App from '@/routes/application/template'

new Vue({
  el: 'pioupiou-app',
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

// Raven.config('https://db40d3c8c69c4b78b2f2bb3831a4805c@sentry.io/158470')
//   .addPlugin(RavenVue, Vue)
//   .install()

window.Vue = Vue
// window.Raven = Raven
