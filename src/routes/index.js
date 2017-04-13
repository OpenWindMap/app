import Vue from 'vue'
import Router from 'vue-router'

import home from '@/routes/home'
import search from '@/routes/search'
import map from '@/routes/map'
import more from '@/routes/more'

import details from '@/routes/details'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },

    home, search, map, more, details
  ]
})
