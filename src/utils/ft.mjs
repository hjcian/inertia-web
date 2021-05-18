
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

const roundNum = (num, digit = 0) => {
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
    this.totalCost = null
    this.totalMarketValue = null
    this.annualReturn = null
  }

  Summary () {
    console.log('should implement Summary')
    return null
  }

  CurrentHoldings () {
    console.log('should implement CurrentHoldings')
    return null
  }
}

class FTCalculator extends Calculator {
  Summary () {
    if (this.totalCost === null) {
      const holdings = this.CurrentHoldings()
      this.totalCost = Math.abs(holdings.reduce((accumulator, holding) => accumulator + holding.totalCost, 0))
    }
    return {
      totalCost: this.totalCost,
      totalMarketValue: this.totalMarketValue,
      simpleReturn: (this.totalMarketValue - this.totalCost) / this.totalCost,
      annualReturn: this.annualReturn
    }
  }

  CurrentHoldings () {
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

      symbolObj.shares = roundNum(symbolObj.shares, 5)
      symbolObj.totalCost = roundNum(symbolObj.totalCost, 5)
      symbolObj.unitCost = roundNum(symbolObj.totalCost / symbolObj.shares, 5)
    })

    const entries = [...symbolMap.entries()]
    const ret = entries.map(entry => {
      return {
        symbol: entry[0],
        ...entry[1]
      }
    })

    return ret
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
    const columns = line.split(',')
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
