import Vue from 'vue'
import Details from '@/routes/details/template.vue'

export default {
  path: '/details/:id',
  name: 'details',
  label() {
    return Vue.prototype.$pgettext('Route label', 'Details')
  },

  component: Details,
  props: ({ params }) => ({ id: params.id })
}
