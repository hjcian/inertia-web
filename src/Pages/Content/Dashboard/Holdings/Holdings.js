import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Typography
} from '@material-ui/core'
import { useHoldings } from '../../../../global/context/holdings'
import { useLang } from '../../../../global/context/language'

const largeNum = 10000
const largeFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

const Currency = ({ number }) => {
  return (<>{number > largeNum ? largeFormatter.format(number) : `$ ${number.toFixed(2)}`}</>)
}

const HoldingRow = ({ symbol, shares, totalCost, unitCost, price, marketValue }) => {
  const { lang } = useLang()
  const { holdingsPart } = lang.Holdings
  return (
    <TableRow key={symbol}>
      <TableCell align='left'>
        {symbol}
        <div className='PositionShares'>{`${shares.toFixed(2)} ${holdingsPart.sharesText}`}</div>
      </TableCell>
      <TableCell align='right'><Currency number={totalCost} /></TableCell>
      <TableCell align='right'><Currency number={unitCost} /></TableCell>
      <TableCell align='right'>
        {price > 0 ? <Currency number={price} /> : <CircularProgress size='1rem' thickness={6} />}
      </TableCell>
      <TableCell align='right'>
        {marketValue > 0 ? <Currency number={marketValue} /> : <CircularProgress size='1rem' thickness={6} />}
      </TableCell>
    </TableRow>
  )
}

const HoldingPart = ({ holdings }) => {
  const { lang } = useLang()
  const { holdingsPart } = lang.Holdings

  const Column = ({ text }) => {
    return <Typography variant='body2' color='textSecondary'>{text}</Typography>
  }

  return (
    <>
      <Typography variant='h6' color='textPrimary'>{holdingsPart.title}</Typography>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell size='medium' align='center'><Column text={holdingsPart.position} /></TableCell>
              <TableCell size='medium' align='center'><Column text={holdingsPart.totalCost} /></TableCell>
              <TableCell size='medium' align='center'><Column text={holdingsPart.unitCost} /></TableCell>
              <TableCell size='medium' align='center'><Column text={holdingsPart.price} /></TableCell>
              <TableCell size='medium' align='center'><Column text={holdingsPart.marketValue} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdings.map((holding) => <HoldingRow key={holding.symbol} {...holding} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
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

const SummaryPart = ({ summary }) => {
  const { lang } = useLang()
  const { summaryPart } = lang.Holdings
  const summaryItems = [
    { title: summaryPart.totalCost, value: summary.totalCost },
    { title: summaryPart.totalMarketValue, value: summary.totalMarketValue },
    { title: summaryPart.simpleReturn, value: summary.simpleReturn },
    { title: summaryPart.annualReturn, value: summary.annualReturn }
  ]
  return (
    <>
      <Typography variant='h6' color='textPrimary'>{summaryPart.title}</Typography>
      {summaryItems.map(({ title, value }) => <SummaryItem key={title} title={title} value={value} />)}
    </>
  )
}

const Holdings = () => {
  const { value } = useHoldings()
  const { holdings, summary } = value
  return (
    <div>
      <HoldingPart holdings={holdings} />
      <SummaryPart summary={summary} />
    </div>
  )
}

export default Holdings
