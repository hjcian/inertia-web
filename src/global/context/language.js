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
      brand: 'InertIA',
      usage: 'Usage',
      faq: 'FAQ'
    },
    Content: {
      dropzoneDragActive: 'Drop the transaction CSV file here ...',
      dropzoneDragInactive: 'Drag and drop the transaction CSV file here, or click to select from folder.',
      assetOverview: 'Asset Overview',
      rebalancing: 'Rebalancing'
    },
    LandingPage: {
      mainTitle: "Let's do the index investing more lazier.",
      desc: 'InertIA, Inert Investment Assistant, is a web tool aims to help you to manage your index investment portfolio in a more convenient way.',
      subDesc: 'Just need 3 steps:',
      steps: [
        {
          title: 'Export',
          desc: 'Export your transaction CSV file from Firstrade or self-managed GoogleSheets.',
          imageURL: process.env.PUBLIC_URL + 'assets/export.svg'
        },
        {
          title: 'Upload',
          desc: 'Click below button to upload your transaction CSV file.',
          imageURL: process.env.PUBLIC_URL + 'assets/upload.svg'

        },
        {
          title: 'Review',
          desc: 'Now, you can review your asset allocation and to rebalance online!',
          imageURL: process.env.PUBLIC_URL + 'assets/report.svg'
        }
      ],
      uploadButton: 'Upload your transaction file',
      invalidDataWarnText: 'Unexpected data format. currently supported securities: Firstrade'
    },
    Holdings: {
      holdingsPart: {
        title: 'Holdings',
        position: 'Position',
        totalCost: 'Total Cost',
        unitCost: 'Unit Cost',
        price: 'Price',
        marketValue: 'Market Value'
      },
      summaryPart: {
        title: 'Investment Overview',
        cashBP: 'Cash BP', // BP: Buying Power
        totalCost: 'Total Cost',
        totalMarketValue: 'Total Market Value',
        simpleReturn: 'Simple Return',
        annualReturn: 'Annual Return'
      }
    },
    Rebalancing: {
      capitalInput: 'Capital Input',
      position: 'Position',
      currentRatio: 'Current Ratio',
      targetRatio: 'Target Ratio',
      shouldAdjust: 'Should Adjust',
      wantAdjust: 'Want Adjust',
      ExtraAllocationAdder: {
        tooltip: 'use comma as separator. e.g. VTI, BND',
        placeholder: 'add position(s)',
        invalidSymbolWarning: 'invalid symbol(s):'
      },
      SettledCashCard: {
        title: 'Settled Cash',
        warn: 'Buying power is insufficient!'
      }
    },
    Footer: {
      credit: 'Credits',
      contact: 'Contact'
    },
    Unit: {
      shares: 'shares'
    }
  },
  [zhtw]: {
    Code: zhtw,
    Header: {
      brand: 'InertIA',
      usage: '使用範例',
      faq: '常見問題'
    },
    Content: {
      dropzoneDragActive: '放開你的交易紀錄 CSV 檔...',
      dropzoneDragInactive: '拖放你的交易紀錄(csv file)到這裡，或點擊此區塊從資料夾中選取',
      assetOverview: '資產概要',
      rebalancing: '再平衡試算'
    },
    LandingPage: {
      mainTitle: '讓你更慵懶地實踐指數投資',
      desc: 'InertIA，Inert Investment Assistant，是一個免費的線上工具幫助更方便地管理你的投資組合。',
      subDesc: '只需要三步驟：',
      steps: [
        {
          title: '匯出',
          desc: '從 Firstrade 或自我管理的 GoogleSheets 中匯出交易紀錄檔案 (csv file)。',
          imageURL: process.env.PUBLIC_URL + 'assets/export.svg'
        },
        {
          title: '上傳',
          desc: '點擊下面的按鈕上傳檔案。',
          imageURL: process.env.PUBLIC_URL + 'assets/upload.svg'
        },
        {
          title: '檢閱',
          desc: '現在，你可以檢視你的資產配置，並利用 InertIA 做再平衡試算！',
          imageURL: process.env.PUBLIC_URL + 'assets/report.svg'
        }
      ],
      uploadButton: '上傳你的交易紀錄檔',
      invalidDataWarnText: '不預期的資料格式。目前支援的券商：Firstrade'
    },
    Holdings: {
      holdingsPart: {
        title: '目前持股',
        position: '部位',
        totalCost: '總成本',
        unitCost: '單位成本',
        price: '價格',
        marketValue: '市場價值'
      },
      summaryPart: {
        title: '投資概要',
        cashBP: '現金購買力', // BP: Buying Power
        totalCost: '總成本',
        totalMarketValue: '總市場價值',
        simpleReturn: '簡單報酬率',
        annualReturn: '年化報酬率'
      }
    },
    Rebalancing: {
      capitalInput: '此次投入金額',
      settledCash: '調整後現金結餘',
      position: '部位',
      currentRatio: '目前配置',
      targetRatio: '目標配置',
      shouldAdjust: '應調整',
      wantAdjust: '實際調整',
      ExtraAllocationAdder: {
        tooltip: '使用半形逗點分隔。e.g. VTI, BND',
        placeholder: '增加部位',
        invalidSymbolWarning: '查無資料：'
      },
      SettledCashCard: {
        title: '調整後現金結餘',
        warn: '購買力不足！'
      }
    },
    Footer: {
      credit: 'Credits',
      contact: 'Contact'
    },
    Unit: {
      shares: '股'
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
