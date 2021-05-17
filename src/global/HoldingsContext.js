import { createContext, useContext, useState } from 'react'

const holdingsContext = createContext()

const useProvideHoldings = () => {
  const [holdings, setHoldings] = useState(null)
  const updateHoldings = (holdings, cb = () => {}) => {
    setHoldings(holdings)
    cb()
  }
  return { holdings, updateHoldings }
}

export const ProvideHoldings = ({ children }) => {
  const holdings = useProvideHoldings()
  return (
    <holdingsContext.Provider value={holdings}>
      {children}
    </holdingsContext.Provider>
  )
}

export const useHoldings = () => {
  return useContext(holdingsContext)
}
