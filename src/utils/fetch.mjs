
const backend = 'https://rocky-chamber-20950.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols='

export const FetchPrices = async (symbols) => {
  const resp = await fetch(`${backend}${symbols.join(',')}`,
    {
      origin: 'localhost:3000'
    }
  )
  const data = await resp.json()

  const { quoteResponse } = data
  const { result } = quoteResponse || { result: [] }
  const prices = result.map(({ regularMarketPrice, symbol }) => {
    return { price: regularMarketPrice, symbol }
  })

  return prices
}
