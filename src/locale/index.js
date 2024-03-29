import Vue from 'vue'
import GetText from 'vue-gettext'
import convertPlugin from '@/plugins/convert'

import translations from '@/locale/translations'

export const locale = Vue.use(GetText, {
  availableLanguages: {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    es: 'Español',
    pt: 'Português',
    nl: 'Nederlands'
  },
  defaultLanguage: 'en',

  silent: true,

  translations
})

const autoRound = v => v >= 10 ? Math.round(v) : Number(Math.round(v + 'e+1') + 'e-1')

export const convert = Vue.use(convertPlugin, {
  availableUnits: {
    mps: 'm/s',
    kmph: 'km/h',
    mph: 'mph',
    knots: 'knots',
    bft: 'bft'
  },
  defaultUnit: 'kmph',

  conversions: {
    kmph: v => autoRound(v),
    mps: v => autoRound(v / 3.6), // eslint-disable-line no-mixed-operators
    knots: v => autoRound(v / 1.852), // eslint-disable-line no-mixed-operators
    mph: v => autoRound(v / 1.609), // eslint-disable-line no-mixed-operators
    bft: v => v >= 118 ? 12 : v < 1 ? 0 : Math.round(Math.cbrt(Math.pow(v, 2) / 9)) // eslint-disable-line no-mixed-operators
  }
})
