import { useEffect, useState } from 'react'
import {
  Tooltip, Box, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, CircularProgress, InputAdornment, IconButton
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'

import Column from '../Components/Column'
import { FetchPrices } from '../../../../utils/fetch.mjs'
import { formatType, FormatNumber, currencyFormatter } from '../utils/common'
import { useHoldings } from '../../../../global/context/holdings'
import { useLang } from '../../../../global/context/language'

const enterKey = 13

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
  positionField: {
    display: 'flex',
    flexDirection: 'column'
  },
  extraAllocationSymbolFiled: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteButton: {
    padding: '0 0.2rem'
  },
  deleteIcon: {
    fontSize: '1rem'
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
  const { Rebalancing } = lang
  const { value, updateValue } = useHoldings()
  const { holdings, summary, rebalancingData } = value
  const { cashBP, totalMarketValue } = summary
  const [capitalInput, setCapitalInput] = useState(cashBP)
  const [targetRatios, setTargetRatios] = useState(
    rebalancingData === undefined
      ? (holdings.map(({ symbol, marketValue, price, shares }) => {
          const ratio = marketValue / totalMarketValue * 100 // to percentage
          return {
            symbol,
            price,
            shares,
            marketValue,
            ratio,
            targetRatio: ratio.toFixed(0),
            shouldAdjust: 0,
            actualAdjust: 0
          }
        }))
      : rebalancingData
  )
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

  const fetchPrices = (inputSymbols, cb) => {
    const cachedSymbolPrice = targetRatios.filter(({ symbol }) => inputSymbols.includes(symbol)).map(({ symbol, price }) => ({ symbol, price }))
    const cachedSymbols = cachedSymbolPrice.map(sp => sp.symbol)
    const newSymbols = inputSymbols.filter(s => !cachedSymbols.includes(s))

    FetchPrices(newSymbols)
      .then((result) => {
        const extraSymbolPrices = result.filter(({ symbol }) => !cachedSymbols.includes(symbol)).map(({ symbol, price }) => {
          return {
            symbol,
            price,
            shares: 0,
            marketValue: 0,
            ratio: 0,
            targetRatio: 0,
            shouldAdjust: 0,
            actualAdjust: 0,
            isExtra: true
          }
        })
        const updatedRebalancingData = [...targetRatios, ...extraSymbolPrices]
        // update global state for component mount/unmount
        updateValue({ holdings, summary, rebalancingData: updatedRebalancingData })
        // update local state for component update
        setTargetRatios(updatedRebalancingData)
        const combined = [...result, ...cachedSymbolPrice]
        cb(combined)
      })
  }

  const handleDeleteExtraSymbol = (deletedSymbol) => {
    const updatedTargetRatios = targetRatios.filter(({ symbol }) => symbol !== deletedSymbol)
    setTargetRatios(updatedTargetRatios)
    const updatedRebalancingData = rebalancingData.filter(({ symbol }) => symbol !== deletedSymbol)
    updateValue({ holdings, summary, rebalancingData: updatedRebalancingData })
  }

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
          <TableBody>{targetRatios.map(
            data => <AllocationRow
              key={data.symbol}
              classes={classes}
              data={data}
              handleTargetRatio={handleTargetRatio}
              handleActualAdjust={handleActualAdjust}
              handleDeleteExtraSymbol={handleDeleteExtraSymbol}
                    />)}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.newSymbolField}>
        <ExtraAllocationAdder fetchPrices={fetchPrices} />
      </Box>
    </div>
  )
}

export default Rebalancing

const AllocationRow = ({ classes, data, handleTargetRatio, handleActualAdjust, handleDeleteExtraSymbol }) => {
  const { lang } = useLang()
  const { Unit } = lang
  const { symbol, price, shares, marketValue, ratio, shouldAdjust, actualAdjust, targetRatio, isExtra = false } = data
  const shareText = `${shares.toFixed(2)} ${Unit.shares}`
  return (
    <TableRow key={symbol}>
      <StyledTableCell component='th' scope='row'>
        <Tooltip
          title={`${shares.toFixed(2)} x ${currencyFormatter(price)} = ${currencyFormatter(marketValue)}`}
          arrow
          disableHoverListener={isExtra}
        >
          <Box className={classes.positionField}>
            <Box className={classes.extraAllocationSymbolFiled}>
              <div>{symbol}</div>
              {
                isExtra
                  ? (
                    <IconButton
                      className={classes.deleteButton}
                      onClick={() => handleDeleteExtraSymbol(symbol)}
                    >
                      <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>)
                  : null
              }
            </Box>
            <Typography variant='caption' color='textSecondary'>{isExtra ? currencyFormatter(price) : shareText}</Typography>
          </Box>
        </Tooltip>
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
}

const ExtraAllocationAdder = (props) => {
  const { lang } = useLang()
  const { ExtraAllocationAdder } = lang.Rebalancing
  const [isFetchExtra, setIsFetchExtra] = useState(false)
  const [extraAllocationInput, setExtraAllocationInput] = useState('')
  const [invalidSymbols, setInvalidSymbols] = useState([])

  return (
    <Tooltip title={ExtraAllocationAdder.tooltip} arrow>
      <TextField
        disabled={isFetchExtra}
        value={extraAllocationInput}
        label={ExtraAllocationAdder.placeholder}
        onKeyDown={
            (e) => {
              if (e.keyCode === enterKey) {
                const inputSymbols = extraAllocationInput
                  .split(',')
                  .map(s => s.trim())
                  .filter(s => s.length)
                setIsFetchExtra(true)

                props.fetchPrices(
                  inputSymbols,
                  result => {
                    setIsFetchExtra(false)
                    const resultSymbols = result.map(({ symbol }) => symbol)
                    const missedSymbols = inputSymbols.filter(s => !resultSymbols.includes(s))
                    const fetchedSymbols = inputSymbols.filter(s => resultSymbols.includes(s))
                    setInvalidSymbols(missedSymbols)
                    setExtraAllocationInput(fetchedSymbols.join(','))
                  })
              }
            }
          }
        onChange={(e) => setExtraAllocationInput(e.target.value.toUpperCase())}
        InputProps={
          isFetchExtra
            ? { endAdornment: <InputAdornment position='end'><CircularProgress size='1rem' /></InputAdornment> }
            : {}
        }
        {...(invalidSymbols.length !== 0
          ? {
              error: true,
              helperText: `${ExtraAllocationAdder.placeholder}: ${invalidSymbols.join(', ')}`
            }
          : {})}
      />
    </Tooltip>
  )
}
