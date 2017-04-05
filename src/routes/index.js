import Vue from 'vue'
import Router from 'vue-router'

import map from '@/routes/map'
import details from '@/routes/details'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/map' },

    map, details
  ]
})
