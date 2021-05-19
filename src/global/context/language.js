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
    },
    Content: {
      dropzoneDragActive: 'Drop the transaction CSV file here ...',
      dropzoneDragInactive: 'Drag and drop the transaction CSV file here, or click to select from folder.'
    }
  },
  [zhtw]: {
    Header: {
      brand: 'InertIA'
    },
    Content: {
      dropzoneDragActive: '放開你的交易紀錄 CSV 檔...',
      dropzoneDragInactive: '拖放你的交易紀錄 CSV 檔到這裡，或點擊此區塊從資料夾中選取'
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
