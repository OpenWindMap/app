import Vue from 'vue'
import timeago from 'timeago.js'

const vm = Vue.prototype

timeago.register('i18n', (number, index) => [
  [vm.$pgettext('Time to words', 'just now'), vm.$pgettext('Time to words', 'right now')],
  [vm.$pgettext('Time to words', 'few seconds ago'), vm.$pgettext('Time to words', 'in few seconds')],
  [vm.$pgettext('Time to words', '1 minute ago'), vm.$pgettext('Time to words', 'in 1 minute')],
  [vm.$pgettext('Time to words', '%s minutes ago'), vm.$pgettext('Time to words', 'in %s minutes')],
  [vm.$pgettext('Time to words', '1 hour ago'), vm.$pgettext('Time to words', 'in 1 hour')],
  [vm.$pgettext('Time to words', '%s hours ago'), vm.$pgettext('Time to words', 'in %s hours')],
  [vm.$pgettext('Time to words', '1 day ago'), vm.$pgettext('Time to words', 'in 1 day')],
  [vm.$pgettext('Time to words', '%s days ago'), vm.$pgettext('Time to words', 'in %s days')],
  [vm.$pgettext('Time to words', '1 week ago'), vm.$pgettext('Time to words', 'in 1 week')],
  [vm.$pgettext('Time to words', '%s weeks ago'), vm.$pgettext('Time to words', 'in %s weeks')],
  [vm.$pgettext('Time to words', '1 month ago'), vm.$pgettext('Time to words', 'in 1 month')],
  [vm.$pgettext('Time to words', '%s months ago'), vm.$pgettext('Time to words', 'in %s months')],
  [vm.$pgettext('Time to words', '1 year ago'), vm.$pgettext('Time to words', 'in 1 year')],
  [vm.$pgettext('Time to words', '%s years ago'), vm.$pgettext('Time to words', 'in %s years')]
][index])

export default Vue.filter('timeago', (datetime, now) => timeago(now).format(datetime, 'i18n'))
