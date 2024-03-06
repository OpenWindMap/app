import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource, {})

Vue.url.options.root = 'https://api.openwindmap.org/v2/Q7kDmB9CFw1aPXm5'

export default {
  root: Vue.url.options.root
}
