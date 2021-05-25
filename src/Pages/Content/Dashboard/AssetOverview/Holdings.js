import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core'

import Column from '../Components/Column'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useLang } from '../../../../global/context/language'
import { withFetching, Currency } from '../utils/common'

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '0.3rem 1rem'
  }
}))(TableCell)

const useStyles = makeStyles((theme) => ({
  positionShares: {
    fontSize: '0.6rem'
  }
}))
const HoldingRow = ({ symbol, shares, totalCost, unitCost, price, marketValue, fetching }) => {
  const classes = useStyles()
  const { lang } = useLang()
  const { holdingsPart } = lang.Holdings
  const FetchingCurrency = withFetching(Currency, fetching)
  return (
    <TableRow key={symbol}>
      <StyledTableCell align='left'>
        {symbol}
        <div className={classes.positionShares}>{`${shares.toFixed(2)} ${holdingsPart.sharesText}`}</div>
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

  return (
    <TableContainer component={Paper}>
      <Table size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'><Column text={holdingsPart.position} /></StyledTableCell>
            <StyledTableCell align='right'><Column text={holdingsPart.totalCost} /></StyledTableCell>
            <StyledTableCell align='right'><Column text={holdingsPart.unitCost} /></StyledTableCell>
            <StyledTableCell align='right'><Column text={holdingsPart.price} /></StyledTableCell>
            <StyledTableCell align='right'><Column text={holdingsPart.marketValue} /></StyledTableCell>
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
