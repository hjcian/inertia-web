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

// const holdings = [{ symbol: 'BND', shares: 60.42428, totalCost: 5097.85, unitCost: 84.36758, price: 0, marketValue: 0 }, { symbol: 'VT', shares: 317.29683, totalCost: 22643.62, unitCost: 71.36415, price: 0, marketValue: 0 }, { symbol: 'BNDX', shares: 90.65132, totalCost: 5183.37, unitCost: 57.1792, price: 0, marketValue: 0 }, { symbol: 'VNQ', shares: 56.43618, totalCost: 5053.63, unitCost: 89.54593, price: 0, marketValue: 0 }, { symbol: 'IUSV', shares: 36.12611, totalCost: 2510.74, unitCost: 69.49932, price: 0, marketValue: 0 }, { symbol: 'IJS', shares: 26, totalCost: 2636.4, unitCost: 101.4, price: 0, marketValue: 0 }]
// const summary = { totalCost: 41789, totalMarketValue: 0, simpleReturn: -1, annualReturn: 0 }
const holdings = [{ symbol: 'BND', shares: 60.42428, totalCost: 5097.85, unitCost: 84.36758, price: 84.8, marketValue: 5123.978944 }, { symbol: 'VT', shares: 317.29683, totalCost: 22643.62, unitCost: 71.36415, price: 100.38, marketValue: 31850.2557954 }, { symbol: 'BNDX', shares: 90.65132, totalCost: 5183.37, unitCost: 57.1792, price: 56.57, marketValue: 5128.1451724 }, { symbol: 'VNQ', shares: 56.43618, totalCost: 5053.63, unitCost: 89.54593, price: 96.89, marketValue: 5468.1014802 }, { symbol: 'IUSV', shares: 36.12611, totalCost: 2510.74, unitCost: 69.49932, price: 71.96, marketValue: 2599.6348755999998 }, { symbol: 'IJS', shares: 26, totalCost: 2636.4, unitCost: 101.4, price: 103.83, marketValue: 2699.58 }]
const summary = { totalCost: 41789, totalMarketValue: 52869.7, simpleReturn: 0.26515829524516016, annualReturn: 0.1667324381962195 }

const testData = { holdings, summary }
// const testData = null

export const { Provide: ProvideSummary, useValue: useSummary } = NewContext()
export const { Provide: ProvideHoldings, useValue: useHoldings } = NewContext(testData)
