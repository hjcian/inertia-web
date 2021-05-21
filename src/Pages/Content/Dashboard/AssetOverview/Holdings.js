import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import { useLang } from '../../../../global/context/language'
import { withFetching, Currency } from './common'

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '0.3rem 1rem'
  }
}))(TableCell)

const HoldingRow = ({ symbol, shares, totalCost, unitCost, price, marketValue, fetching }) => {
  const { lang } = useLang()
  const { holdingsPart } = lang.Holdings
  const FetchingCurrency = withFetching(Currency, fetching)
  return (
    <TableRow key={symbol}>
      <StyledTableCell align='left'>
        {symbol}
        <div className='PositionShares'>{`${shares.toFixed(2)} ${holdingsPart.sharesText}`}</div>
      </StyledTableCell>
      <StyledTableCell align='right'><Currency number={totalCost} /></StyledTableCell>
      <StyledTableCell align='right'><Currency number={unitCost} /></StyledTableCell>
      <StyledTableCell align='right'><FetchingCurrency number={price} /></StyledTableCell>
      <StyledTableCell align='right'><FetchingCurrency number={marketValue} /></StyledTableCell>
    </TableRow>
  )
}

const Holding = ({ holdings, fetching }) => {
  const { lang } = useLang()
  const { holdingsPart } = lang.Holdings

  const Column = ({ text }) => {
    return <Typography variant='body2' color='textSecondary'>{text}</Typography>
  }

  return (
    <TableContainer component={Paper}>
      <Table size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'><Column text={holdingsPart.position} /></StyledTableCell>
            <StyledTableCell align='center'><Column text={holdingsPart.totalCost} /></StyledTableCell>
            <StyledTableCell align='center'><Column text={holdingsPart.unitCost} /></StyledTableCell>
            <StyledTableCell align='center'><Column text={holdingsPart.price} /></StyledTableCell>
            <StyledTableCell align='center'><Column text={holdingsPart.marketValue} /></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holdings.map((holding) => <HoldingRow key={holding.symbol} {...holding} fetching={fetching} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Holding
