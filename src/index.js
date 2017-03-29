import Vue from 'vue'

import router from '@/router'
import locale from '@/locale'

import App from '@/views/Application'

new Vue({
  el: 'pioupiou-app',
  components: { App },

  render: h => h('app'),

  router,
  locale
})
