import Vue from 'vue'
import Map from '@/routes/map/template.vue'

export default {
  path: '/map',
  name: 'map',
  label() {
    return Vue.prototype.$pgettext('Route label', 'Map')
  },

  icon: 'map-o',
  nav: true,
  mobile: true,

  component: Map
}
