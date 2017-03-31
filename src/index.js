import Vue from 'vue'

import router from '@/routes'
import locale from '@/locale'
import http from '@/resources/http'
import store from '@/store'

import App from '@/routes/application/template'

new Vue({
  el: 'pioupiou-app',
  components: { App },

  render: h => h('app'),

  router,
  locale,
  http,
  store
})
