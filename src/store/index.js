import Vue from 'vue'
import Vuex from 'vuex'

import pioupious from '@/store/pioupious'

Vue.use(Vuex, {})

export default new Vuex.Store({
  modules: {
    pioupious
  }
})
