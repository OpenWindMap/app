import Vue from 'vue'

import { locale, convert } from '@/locale'
import http from '../../../../src/resources/http'
import store from '@/store'
import filters from '@/filters'

import widget from './widget'

const SEL = 'pioupiou-map'

document.querySelectorAll(SEL).forEach(elem => {
  new Vue({
    el: elem,

    components: { widget },

    render(h) {
      return h('widget', {
        props: {
          stationId: elem.getAttribute('station-id'),
          lightStyle: elem.getAttribute('light-style')
        }
      })
    },

    locale, convert, http, store, filters
  })
})

store.dispatch('user/syncTime')
store.dispatch('user/restoreStore')
