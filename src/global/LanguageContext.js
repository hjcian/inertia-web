import { createContext, useContext, useState } from 'react'

const en = 'en'
const zhtw = 'zh-TW'

export const supportedLangs = [
  { code: en, text: 'English' },
  { code: zhtw, text: '繁體中文' }
]

// language data format
//   langs = {
//     <lang>: {
//        <Component Name>: {
//            <part>: <text>
//        }
//     }
// }

const langs = {
  [en]: {
    Header: {
      brand: 'InertIA'
    }
  },
  [zhtw]: {
    Header: {
      brand: 'InertIA'
    }
  }
}

const langContext = createContext()

const useProvideLang = () => {
  const [lang, setLang] = useState(langs.en)
  const switchLang = (lang, cb = () => {}) => {
    setLang(langs[lang])
    cb()
  }
  return { lang, switchLang }
}

export const ProvideLang = ({ children }) => {
  const lang = useProvideLang()
  return (
    <langContext.Provider value={lang}>
      {children}
    </langContext.Provider>
  )
}

export const useLang = () => {
  return useContext(langContext)
}
