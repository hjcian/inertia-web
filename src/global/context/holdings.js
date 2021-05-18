import { createContext, useContext, useState } from 'react'

export const NewContext = (initValue = null) => {
  const context = createContext()
  const useProvide = () => {
    const [value, setValue] = useState(initValue)
    const updateValue = (value, cb = () => {}) => {
      setValue(value)
      cb()
    }
    return { value, updateValue }
  }
  const Provide = ({ children }) => {
    const value = useProvide()
    return (
      <context.Provider value={value}>
        {children}
      </context.Provider>
    )
  }
  const useValue = () => {
    return useContext(context)
  }
  return { Provide, useValue }
}

// const testData = [
//   { symbol: 'BND', shares: 60.42428, totalCost: -5097.85, unitCost: -84.36758, price: 0, marketValue: 0 }, { symbol: 'VT', shares: 317.29683, totalCost: -22643.62, unitCost: -71.36415, price: 0, marketValue: 0 }, { symbol: 'BNDX', shares: 90.65132, totalCost: -5183.37, unitCost: -57.1792, price: 0, marketValue: 0 }, { symbol: 'VNQ', shares: 56.43618, totalCost: -5053.63, unitCost: -89.54593, price: 0, marketValue: 0 }, { symbol: 'IUSV', shares: 36.12611, totalCost: -2510.74, unitCost: -69.49932, price: 0, marketValue: 0 }, { symbol: 'IJS', shares: 26, totalCost: -2636.4, unitCost: -101.4, price: 0, marketValue: 0 }
// ]

const testData = null

// const holdingsContext = createContext()

// const useProvideHoldings = () => {
//   const [holdings, setHoldings] = useState(testData)
//   const updateHoldings = (holdings, cb = () => {}) => {
//     setHoldings(holdings)
//     cb()
//   }
//   return { holdings, updateHoldings }
// }

// export const ProvideHoldings = ({ children }) => {
//   const holdings = useProvideHoldings()
//   return (
//     <holdingsContext.Provider value={holdings}>
//       {children}
//     </holdingsContext.Provider>
//   )
// }

// export const useHoldings = () => {
//   return useContext(holdingsContext)
// }

export const { Provide: ProvideSummary, useValue: useSummary } = NewContext()
export const { Provide: ProvideHoldings, useValue: useHoldings } = NewContext(testData)
