import Vue from 'vue'
import Details from '@/routes/details/template'

export default {
  path: '/details/:id',
  name: 'details',
  label: Vue.prototype.$pgettext('Route label', 'Details'),

  component: Details,
  props: ({ params }) => ({ id: parseInt(params.id, 10) })
}
