const DataTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Unit Cost</th>
          <th>Total Cost</th>
          <th>Price</th>
          <th>Market Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>VT/100</td>
          <td>70</td>
          <td>7000</td>
          <td>100</td>
          <td>10000</td>
        </tr>
        <tr>
          <td>VT/100</td>
          <td>70</td>
          <td>7000</td>
          <td>100</td>
          <td>10000</td>
        </tr>
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
  const fakeValues = [
    { title: 'Total Cost', value: 7000 },
    { title: 'Total Market Value', value: 10000 },
    { title: 'Simple Return', value: '30%' },
    { title: 'Annual Return', value: '7%' }
  ]
  return (
    <div>
      <h4>Holdings</h4>
      <DataTable />
      <h4>Summary</h4>
      {fakeValues.map(({ title, value }) => <SummaryItem key={title} title={title} value={value} />)}
    </div>
  )
}

export default Holdings
