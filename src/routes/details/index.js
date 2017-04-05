import { prototype as Vue } from 'vue'
import Details from '@/routes/details/template'

export default {
  path: '/details/:id',
  name: 'details',
  label: Vue.$pgettext('Route label', 'Details'),

  component: Details,
  props: true
}
