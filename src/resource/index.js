import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource, {})

Vue.url.options.root = 'http://api.pioupiou.fr/v1'

export default {
  http: {
    root: Vue.url.options.root
  }
}
