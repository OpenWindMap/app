import Vue from 'vue'
import Home from '@/routes/home/template.vue'

export default {
  path: '/home',
  name: 'home',
  label() {
    return Vue.prototype.$pgettext('Route label', 'Home')
  },

  icon: 'list-ul',
  nav: true,
  mobile: true,

  component: Home
}
