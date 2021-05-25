
import xirr from 'xirr'

const headRow = 'Symbol,Quantity,Price,Action,Description,TradeDate,SettledDate,Interest,Amount,Commission,Fee,CUSIP,RecordType'
const numField = 13
const SymbolIdx = 0
const QuantityIdx = 1
const PriceIdx = 2
const ActionIdx = 3
const DescriptionIdx = 4
const TradeDateIdx = 5
const SettledDateIdx = 6
const InterestIdx = 7
const AmountIdx = 8
const CommissionIdx = 9
const FeeIdx = 10
const CUSIPIdx = 11
const RecordTypeIdx = 12

const round = (num, digit = 0) => {
  const decimalPoints = Math.pow(10, digit)
  return Math.round(num * decimalPoints) / decimalPoints
}

class Row {
  constructor (
    Symbol,
    Quantity,
    Price,
    Action,
    Description,
    TradeDate,
    SettledDate,
    Interest,
    Amount,
    Commission,
    Fee,
    CUSIP,
    RecordType
  ) {
    this.Symbol = Symbol
    this.Quantity = parseFloat(Quantity)
    this.Price = parseFloat(Price)
    this.Action = Action
    this.Description = Description
    this.TradeDate = TradeDate
    this.SettledDate = SettledDate
    this.Interest = parseFloat(Interest)
    this.Amount = parseFloat(Amount)
    this.Commission = parseFloat(Commission)
    this.Fee = parseFloat(Fee)
    this.CUSIP = CUSIP
    this.RecordType = RecordType
  }
}

class Calculator {
  constructor (rows) {
    this.rows = rows
    this.symbolMap = this.genSymbolMap()
  }

  genSymbolMap () {
    console.log('should implement')
    return new Map([])
  }

  computeTotalCost () {
    console.log('should implement')
    return 0
  }

  computeMarketValue () {
    console.log('should implement')
    return 0
  }

  computeIRR (totalMarketValue) {
    console.log('should implement')
    return 0
  }

  computeCashBP () {
    return 0
  }

  CurrentHoldings () {
    const entries = [...this.symbolMap.entries()]
    const currentHoldings = entries.map(entry => {
      return {
        symbol: entry[0],
        ...entry[1]
      }
    })
    return currentHoldings
  }

  Summary () {
    const totalCost = this.computeTotalCost()
    const totalMarketValue = this.computeMarketValue()
    const simpleReturn = (totalMarketValue - totalCost) / totalCost
    const annualReturn = this.computeIRR(totalMarketValue)
    const cashBP = this.computeCashBP()
    return {
      totalCost,
      totalMarketValue,
      simpleReturn,
      annualReturn,
      cashBP
    }
  }

  UpdatePrices (prices) {
    prices.forEach(({ symbol, price }) => {
      const symbolObj = this.symbolMap.get(symbol)
      if (symbolObj) {
        symbolObj.price = price
        symbolObj.marketValue = price * symbolObj.shares
      }
    })
  }

  GetSymbols () {
    return [...this.symbolMap.keys()]
  }
}

class FTCalculator extends Calculator {
  genSymbolMap () {
    const symbolMap = new Map(
      this.rows
        .map(row => {
          return [row.Symbol, {
            shares: 0,
            totalCost: 0,
            unitCost: 0,
            price: 0,
            marketValue: 0
          }]
        })
        .filter(symbol => symbol[0] !== '')
    )

    this.rows
      .filter(row => row.Symbol !== '')
      .forEach(row => {
        if (row.Action === 'BUY' || row.Action === 'SELL' || row.Action === 'Other') {
        // Quantity is negative if Action is `SELL`
          symbolMap.get(row.Symbol).shares += row.Quantity
          symbolMap.get(row.Symbol).totalCost += row.Amount
        }
      })

    const symbols = [...symbolMap.keys()]
    symbols.forEach(symbol => {
      const symbolObj = symbolMap.get(symbol)
      if (symbolObj.shares < 0.0000001) {
        symbolMap.delete(symbol)
        return
      }

      symbolObj.shares = round(symbolObj.shares, 5)
      symbolObj.totalCost = Math.abs(round(symbolObj.totalCost, 5))
      symbolObj.unitCost = Math.abs(round(symbolObj.totalCost / symbolObj.shares, 5))
    })

    return symbolMap
  }

  computeTotalCost () {
    const totalCost = this.rows.reduce((accumulator, row) =>
      row.RecordType === 'Trade'
        ? accumulator + row.Amount
        : accumulator, 0)
    return round(Math.abs(totalCost), 2)
  }

  computeMarketValue () {
    const entries = [...this.symbolMap.entries()]
    const totalMarketValue = entries.reduce((accumulator, entry) => accumulator + entry[1].marketValue, 0)
    return round(totalMarketValue, 2)
  }

  computeIRR (totalMarketValue) {
    if (totalMarketValue === 0) {
      return 0
    }
    // i.e. Annual Return
    const transactions = [...this.rows
      .filter(row => row.RecordType === 'Trade')
      .map(row => {
        return { amount: row.Amount, when: new Date(row.TradeDate) }
      }), { amount: totalMarketValue, when: new Date() }]
    const rate = xirr(transactions, { guess: 0.1 })
    return rate
  }

  computeCashBP () {
    return this.rows.reduce((accumulator, row) => accumulator + row.Amount, 0)
  }
}

export const ParseFromString = (string) => {
  const lines = string.split('\n')
  const firstRow = lines[0].trim()
  if (!(numField === firstRow.split(',').length && firstRow === headRow)) {
    return null
  }

  const rows = lines.map((line, idx) => {
    if (idx === 0) {
      return null
    }
    const columns = line.trim().split(',')
    const row = new Row(
      columns[SymbolIdx],
      columns[QuantityIdx],
      columns[PriceIdx],
      columns[ActionIdx],
      columns[DescriptionIdx],
      columns[TradeDateIdx],
      columns[SettledDateIdx],
      columns[InterestIdx],
      columns[AmountIdx],
      columns[CommissionIdx],
      columns[FeeIdx],
      columns[CUSIPIdx],
      columns[RecordTypeIdx]
    )
    return row
  }).filter(v => v !== null)
  return new FTCalculator(rows)
}
