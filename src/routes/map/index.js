import Vue from 'vue'
import Map from '@/routes/map/template'

export default {
  path: '/map',
  name: 'map',
  label: Vue.prototype.$pgettext('Route label', 'Map'),

  icon: 'map',
  nav: true,
  mobile: true,

  component: Map
}
