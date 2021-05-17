import { createContext, useContext, useState } from 'react'

const HoldingsContext = createContext()

const useProvideHoldings = () => {
  const [holdings, setHoldings] = useState(null)
  const updateHoldings = (holdings, cb) => {
    setHoldings(holdings)
    cb()
  }
  return { holdings, updateHoldings }
}

export const ProvideHoldings = ({ children }) => {
  const holdings = useProvideHoldings()
  return (
    <HoldingsContext.Provider value={holdings}>
      {children}
    </HoldingsContext.Provider>
  )
}

export const useHoldings = () => {
  return useContext(HoldingsContext)
}
