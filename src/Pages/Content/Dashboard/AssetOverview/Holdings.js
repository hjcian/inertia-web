import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@material-ui/core'

import { Column, PrimaryField } from '../Components'
import { withStyles } from '@material-ui/core/styles'
import { useLang } from '../../../../global/context/language'
import { withFetching, currencyFormatter } from '../utils/common'

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '0.3rem 1rem'
  }
}))(TableCell)

const HoldingRow = ({ symbol, shares, totalCost, unitCost, price, marketValue, fetching }) => {
  const { Unit } = useLang().lang
  const FetchingPrimaryField = withFetching(PrimaryField, fetching)
  const shareText = `${shares.toFixed(2)} ${Unit.shares}`
  return (
    <TableRow key={symbol}>
      <StyledTableCell align='left'>
        <PrimaryField text={symbol} />
        <Typography variant='caption' color='textSecondary'>{shareText}</Typography>
      </StyledTableCell>
      <StyledTableCell align='right'><PrimaryField text={currencyFormatter(totalCost)} /></StyledTableCell>
      <StyledTableCell align='right'><PrimaryField text={currencyFormatter(unitCost)} /></StyledTableCell>
      <StyledTableCell align='right'><FetchingPrimaryField text={currencyFormatter(price)} /></StyledTableCell>
      <StyledTableCell align='right'><FetchingPrimaryField text={currencyFormatter(marketValue)} /></StyledTableCell>
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
