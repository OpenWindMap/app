import Vue from 'vue'
import Home from '@/routes/first-run/template.vue'

export default {
  path: '/first-run',
  name: 'first-run',
  label() {
    return Vue.prototype.$pgettext('Route label', 'First run')
  },

  icon: '',
  nav: false,
  mobile: true,

  component: Home
}
