import Vue from 'vue'
import GetText from 'vue-gettext'

import translations from '@/locale/translations'

export default Vue.use(GetText, {
  availableLanguages: {
    en: 'English',
    fr: 'Français',
    jp: '日本語'
  },
  defaultLanguage: 'en',

  silent: true,

  translations
})
