import { useHoldings } from '../../../../global/context/holdings'

const HoldingRow = ({ symbol, shares, totalCost, unitCost, price, marketValue }) => {
  return (
    <tr>
      <td>{symbol}<div>{shares}</div></td>
      <td>{totalCost}</td>
      <td>{unitCost}</td>
      <td>{price}</td>
      <td>{marketValue}</td>
    </tr>
  )
}

const HoldingTable = ({ holdings }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Total Cost</th>
          <th>Unit Cost</th>
          <th>Price</th>
          <th>Market Value</th>
        </tr>
      </thead>
      <tbody>
        {holdings.map((holding) => <HoldingRow key={holding.symbol} {...holding} />)}
      </tbody>
    </table>
  )
}

const SummaryItem = (props) => {
  return (
    <div className='SummaryItem'>
      <div className='SummaryItemTitle'>{props.title}</div>
      <div className='SummaryItemValue'>{props.value}</div>
    </div>
  )
}

const Holdings = () => {
  const { value } = useHoldings()
  const { holdings, summary } = value
  console.log(holdings)
  console.log(summary)
  const summaryItems = [
    { title: 'Total Cost', value: summary.totalCost },
    { title: 'Total Market Value', value: summary.totalMarketValue },
    { title: 'Simple Return', value: summary.simpleReturn },
    { title: 'Annual Return', value: summary.annualReturn }
  ]
  return (
    <div>
      <h4>Holdings</h4>
      <HoldingTable holdings={holdings} />
      <h4>Summary</h4>
      {summaryItems.map(({ title, value }) => <SummaryItem key={title} title={title} value={value} />)}
    </div>
  )
}

export default Holdings
