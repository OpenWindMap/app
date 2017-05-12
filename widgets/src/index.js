import Vue from 'vue'

import { locale, convert } from '@/locale'
import http from '../../src/resources/http'
import store from '@/store'

import widget from './widget'

document.querySelectorAll('pioupiou-widget').forEach(elem => {
  new Vue({
    el: elem,

    components: { widget },

    render(h) {
      return h('widget', {
        props: {
          stationId: elem.getAttribute('station-id')
        }
      })
    },

    locale, convert, http, store
  })
})

store.dispatch('user/syncTime')
store.dispatch('user/restoreStore')
