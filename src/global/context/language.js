import { createContext, useContext, useState } from 'react'

const en = 'en'
const zhtw = 'zh-TW'

export const supportedLangs = [
  { code: zhtw, text: '中文' },
  { code: en, text: 'English' }
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
    Code: en,
    Header: {
      brand: 'InertIA'
    },
    Content: {
      dropzoneDragActive: 'Drop the transaction CSV file here ...',
      dropzoneDragInactive: 'Drag and drop the transaction CSV file here, or click to select from folder.',
      assetOverview: 'Asset Overview',
      rebalancing: 'Rebalancing'
    },
    Holdings: {
      holdingsPart: {
        title: 'Holdings',
        position: 'Position',
        totalCost: 'Total Cost',
        unitCost: 'Unit Cost',
        price: 'Price',
        marketValue: 'Market Value',
        sharesText: 'shares'
      },
      summaryPart: {
        title: 'Investment Overview',
        totalCost: 'Total Cost',
        totalMarketValue: 'Total Market Value',
        simpleReturn: 'Simple Return',
        annualReturn: 'Annual Return'
      }
    },
    Footer: {
      version: 'Version'
    }
  },
  [zhtw]: {
    Code: zhtw,
    Header: {
      brand: 'InertIA'
    },
    Content: {
      dropzoneDragActive: '放開你的交易紀錄 CSV 檔...',
      dropzoneDragInactive: '拖放你的交易紀錄(csv file)到這裡，或點擊此區塊從資料夾中選取',
      assetOverview: '資產概要',
      rebalancing: '再平衡試算'
    },
    Holdings: {
      holdingsPart: {
        title: '目前持股',
        position: '部位',
        totalCost: '總成本',
        unitCost: '單位成本',
        price: '價格',
        marketValue: '市場價值',
        sharesText: '股'
      },
      summaryPart: {
        title: '投資概要',
        totalCost: '總成本',
        totalMarketValue: '總市場價值',
        simpleReturn: '簡單報酬率',
        annualReturn: '年化報酬率'
      }
    },
    Footer: {
      version: '版本'
    }
  }
}

const langContext = createContext()

const useProvideLang = () => {
  const [lang, setLang] = useState(langs[zhtw])
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
