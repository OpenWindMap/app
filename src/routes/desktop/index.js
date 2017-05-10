import Dekstop from '@/routes/desktop/template'

import details from '@/routes/details'
import search from '@/routes/search'

export default {
  path: '/desktop',
  name: 'dekstop',

  nav: false,
  mobile: false,

  component: Dekstop,

  children: [
    Object.assign({}, details, { path: 'details/:id', name: 'desktop-details' }),
    Object.assign({}, search, { path: 'search', name: 'desktop-search' })
  ]
}
