import Vue from 'vue'
import Router from 'vue-router'

import hello from '@/routes/hello'
import map from '@/routes/map'

Vue.use(Router)

export default new Router({
  routes: [
    hello, map
  ]
})
