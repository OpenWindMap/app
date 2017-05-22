import Vue from 'vue'
import Search from '@/routes/search/template'

export default {
  path: '/search',
  name: 'search',
  label() {
    return Vue.prototype.$pgettext('Route label', 'Search')
  },

  icon: 'search',
  nav: true,

  component: Search,
  props: ({ params }) => ({ autoFocus: params.autoFocus === true || params.autoFocus === 'true' })
}
