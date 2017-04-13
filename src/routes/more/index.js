import Vue from 'vue'
import More from '@/routes/more/template'

export default {
  path: '/more',
  name: 'more',
  label() {
    return Vue.prototype.$pgettext('Route label', 'More')
  },

  icon: 'ellipsis-h',
  nav: true,
  mobile: true,

  component: More
}
