import Vue from 'vue'

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

window.Vue = Vue
