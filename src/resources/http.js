import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource, {})

Vue.url.options.root = '//api.pioupiou.fr/v1'

export default {
  root: Vue.url.options.root
}
