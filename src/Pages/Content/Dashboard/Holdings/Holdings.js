import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Typography
} from '@material-ui/core'

import { Currency } from './NumberFormatter'
import InvestmentOverview from './InvestmentOverview'

import { useHoldings } from '../../../../global/context/holdings'
import { useLang } from '../../../../global/context/language'

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
        <Table size='medium' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'><Column text={holdingsPart.position} /></TableCell>
              <TableCell align='center'><Column text={holdingsPart.totalCost} /></TableCell>
              <TableCell align='center'><Column text={holdingsPart.unitCost} /></TableCell>
              <TableCell align='center'><Column text={holdingsPart.price} /></TableCell>
              <TableCell align='center'><Column text={holdingsPart.marketValue} /></TableCell>
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

const Holdings = () => {
  const { value } = useHoldings()
  const { holdings, summary } = value
  return (
    <div>
      <HoldingPart holdings={holdings} />
      <InvestmentOverview summary={summary} />
    </div>
  )
}

export default Holdings
