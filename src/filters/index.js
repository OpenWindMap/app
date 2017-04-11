import Vue from 'vue'
import linkify from 'linkifyjs/string'
import timeagoFilter from './timeago'

const linkifyFilter = Vue.filter('linkify', src => linkify(src, { defaultProtocol: 'https', nl2br: true }))

export default {
  linkify: linkifyFilter,
  timeago: timeagoFilter
}
