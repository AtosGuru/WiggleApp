import { en, de, dk, es, fr, it, nl, no, se } from './translations'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: en
  },
  de: {
    translation: de
  },
  dk: {
    translation: dk
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  it: {
    translation: it
  },
  nl: {
    translation: nl
  },
  no: {
    translation: no
  },
  se: {
    translation: se
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react!!
  }
})

export default i18n
