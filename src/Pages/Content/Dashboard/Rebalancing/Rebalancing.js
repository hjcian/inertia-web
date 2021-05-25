import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Column from '../Components/Column'
import { formatType, FormatNumber } from '../utils/common'
import { useHoldings } from '../../../../global/context/holdings'
import { useLang } from '../../../../global/context/language'

const formatBuySell = (number) => {
  return number >= 0 ? Math.floor(number) : Math.ceil(number)
}

const normRatio = (ratio) => {
  return ratio < 0 ? 0 : ratio > 100 ? 100 : ratio
}

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '0.3rem 1rem'
  }
}))(TableCell)

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0 0.5rem'
  },
  infoBox: {
    margin: '0 1rem'
  },
  cardcontent: {
    padding: '0.5rem 0.8rem', // default is too much
    '&:last-child': {
      paddingBottom: '0.5rem' // default is too much
    }
  },
  targetInputField: {
    width: '3rem'
  },
  actualAdjustInputField: {
    width: '5rem'
  }
})
const Rebalancing = () => {
  const classes = useStyles()
  const { lang } = useLang()
  const { Rebalancing, Unit } = lang

  const { holdings, summary } = useHoldings().value
  const { cashBP, totalMarketValue } = summary
  const [capitalInput, setCapitalInput] = useState(cashBP)
  const [targetRatios, setTargetRatios] = useState(
    holdings.map(({ symbol, marketValue, price }) => {
      const ratio = marketValue / totalMarketValue * 100 // to percentage
      return {
        price,
        symbol,
        marketValue,
        ratio,
        targetRatio: ratio.toFixed(0),
        shouldAdjust: 0,
        actualAdjust: 0
      }
    }))
  const [settledCash, setSettledCash] = useState(cashBP)

  const handleCapitalInput = (e) => {
    let value = parseFloat(e.target.value)
    value = !isNaN(value) && value >= 0 ? value : ''
    setCapitalInput(value)
    if (value !== '') {
      const updatedTargetRatios = targetRatios.map((data, idx) => {
        const { marketValue, price, targetRatio } = data
        data.shouldAdjust = ((value + totalMarketValue) * targetRatio / 100 - marketValue) / price
        return data
      })
      setTargetRatios(updatedTargetRatios)
    }
  }

  const handleTargetRatio = (e) => {
    let { value, id } = e.target
    if (value !== '') {
      value = parseInt(value)
      value = value === '' ? '' : isNaN(value) ? 0 : normRatio(value)
    }
    const updatedTargetRatios = targetRatios.map((data, idx) => {
      if (data.symbol === id) {
        const { marketValue, price } = data
        data.targetRatio = value
        data.shouldAdjust = ((capitalInput + totalMarketValue) * value / 100 - marketValue) / price
      }
      return data
    })
    setTargetRatios(updatedTargetRatios)
  }

  const handleActualAdjust = e => {
    let { id, value } = e.target
    value = value === '' ? '' : isNaN(parseInt(value)) ? 0 : value
    const updatedTargetRatios = targetRatios.map((data, idx) => {
      if (data.symbol === id) {
        data.actualAdjust = value
      }
      return data
    })
    setTargetRatios(updatedTargetRatios)
  }

  useEffect(() => {
    const updatedSettledCash = targetRatios.reduce((acc, data) => {
      return acc - formatBuySell(data.actualAdjust) * data.price
    }, capitalInput)
    setSettledCash(updatedSettledCash)
  }, [capitalInput, targetRatios])

  return (
    <div className={classes.root}>
      <Box className={classes.infoContainer}>
        <TextField className={classes.infoBox} value={capitalInput} error={capitalInput === ''} label={Rebalancing.capitalInput} onChange={handleCapitalInput} type='number' />
        <Card className={classes.infoBox}>
          <CardContent className={classes.cardcontent}>
            <FormatNumber type={formatType.currency} value={settledCash} />
            <Typography variant='caption' color='textSecondary' component='p'>{Rebalancing.settledCash}</Typography>
          </CardContent>
        </Card>
      </Box>
      <TableContainer className={classes.infoContainer} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Column text={Rebalancing.position} />
              </StyledTableCell>
              <StyledTableCell>
                <Column text={Rebalancing.currentRatio} />
              </StyledTableCell>
              <StyledTableCell>
                <Column text={Rebalancing.targetRatio} />
              </StyledTableCell>
              <StyledTableCell>
                <Column text={Rebalancing.shouldAdjust} />
              </StyledTableCell>
              <StyledTableCell>
                <Column text={Rebalancing.wantAdjust} />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdings.map(({ symbol, marketValue }, idx) => {
              const { ratio, shouldAdjust, actualAdjust, targetRatio } = targetRatios[idx]
              return (
                <TableRow key={symbol}>
                  <StyledTableCell component='th' scope='row'>
                    {symbol}
                  </StyledTableCell>
                  <StyledTableCell>
                    <FormatNumber type={formatType.rate} value={ratio / 100} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      className={classes.targetInputField}
                      value={targetRatio} id={symbol} onChange={handleTargetRatio} type='number'
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    {`${formatBuySell(shouldAdjust)} ${Unit.shares}`}
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      className={classes.actualAdjustInputField}
                      value={actualAdjust} id={symbol} onChange={handleActualAdjust} type='number'
                    />
                  </StyledTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Rebalancing
