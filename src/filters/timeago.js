import Vue from 'vue'
import timeago from 'timeago.js'

const $pgettext = s => Vue.prototype.$pgettext('Time to words', s)

timeago.register('i18n', (number, index) => [
  [$pgettext('just now'), $pgettext('right now')],
  [$pgettext('few seconds ago'), $pgettext('in few seconds')],
  [$pgettext('1 minute ago'), $pgettext('in 1 minute')],
  [$pgettext('%s minutes ago'), $pgettext('in %s minutes')],
  [$pgettext('1 hour ago'), $pgettext('in 1 hour')],
  [$pgettext('%s hours ago'), $pgettext('in %s hours')],
  [$pgettext('1 day ago'), $pgettext('in 1 day')],
  [$pgettext('%s days ago'), $pgettext('in %s days')],
  [$pgettext('1 week ago'), $pgettext('in 1 week')],
  [$pgettext('%s weeks ago'), $pgettext('in %s weeks')],
  [$pgettext('1 month ago'), $pgettext('in 1 month')],
  [$pgettext('%s months ago'), $pgettext('in %s months')],
  [$pgettext('1 year ago'), $pgettext('in 1 year')],
  [$pgettext('%s years ago'), $pgettext('in %s years')]
][index])

export default Vue.filter('timeago', (datetime, now) => timeago(now).format(datetime, 'i18n'))
