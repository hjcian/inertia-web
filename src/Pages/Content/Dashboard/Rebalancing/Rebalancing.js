import { useEffect, useState } from 'react'
import {
  Tooltip, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import ExtraAllocationAdder from './ExtraAllocationAdder'
import SettledCashCard from './SettledCashCard'
import { Column, PrimaryField, SecondaryField } from '../Components'
import { currencyFormatter, rateFormatter } from '../utils/common'
import { FetchPrices } from '../../../../utils/fetch.mjs'
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

  targetInputField: {
    width: '3rem'
  },
  actualAdjustInputField: {
    width: '5rem'
  }
})
const Rebalancing = () => {
  const classes = useStyles()
  const { Rebalancing } = useLang().lang
  const { value, updateValue } = useHoldings()
  const { holdings, summary, allocationData } = value
  const { cashBP, totalMarketValue } = summary
  const [capitalInput, setCapitalInput] = useState(cashBP)
  const [allocations, setAllocations] = useState(
    allocationData === undefined
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
      : allocationData
  )
  const [settledCash, setSettledCash] = useState(cashBP)

  const handleCapitalInput = (e) => {
    let value = parseFloat(e.target.value)
    value = !isNaN(value) && value >= 0 ? value : ''
    setCapitalInput(value)
    if (value !== '') {
      const updatedAlloc = allocations.map((data, idx) => {
        const { marketValue, price, targetRatio } = data
        data.shouldAdjust = ((value + totalMarketValue) * targetRatio / 100 - marketValue) / price
        return data
      })
      setAllocations(updatedAlloc)
    }
  }

  const handleTargetRatio = (e) => {
    let { value, id } = e.target
    if (value !== '') {
      value = parseInt(value)
      value = value === '' ? '' : isNaN(value) ? 0 : normRatio(value)
    }
    const updatedAlloc = allocations.map((data, idx) => {
      if (data.symbol === id) {
        const { marketValue, price } = data
        data.targetRatio = value
        data.shouldAdjust = ((capitalInput + totalMarketValue) * value / 100 - marketValue) / price
      }
      return data
    })
    setAllocations(updatedAlloc)
  }

  const handleActualAdjust = e => {
    let { id, value } = e.target
    value = value === '' ? '' : isNaN(parseInt(value)) ? 0 : value
    const updatedAlloc = allocations.map((data, idx) => {
      if (data.symbol === id) {
        data.actualAdjust = value
      }
      return data
    })
    setAllocations(updatedAlloc)
  }

  useEffect(() => {
    const updatedSettledCash = allocations.reduce((acc, data) => {
      return acc - formatBuySell(data.actualAdjust) * data.price
    }, capitalInput)
    setSettledCash(updatedSettledCash)
  }, [capitalInput, allocations])

  const fetchPrices = (inputSymbols, cb) => {
    const cachedSymbolPrice = allocations.filter(({ symbol }) => inputSymbols.includes(symbol)).map(({ symbol, price }) => ({ symbol, price }))
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
        const updatedAllocationData = [...allocations, ...extraSymbolPrices]
        // update global state for component mount/unmount
        updateValue({ holdings, summary, allocationData: updatedAllocationData })
        // update local state for component update
        setAllocations(updatedAllocationData)
        const combined = [...result, ...cachedSymbolPrice]
        cb(combined)
      })
  }

  const handleDeleteExtraSymbol = (deletedSymbol) => {
    const updatedAlloc = allocations.filter(({ symbol }) => symbol !== deletedSymbol)
    setAllocations(updatedAlloc)
    const updatedAllocationData = allocationData.filter(({ symbol }) => symbol !== deletedSymbol)
    updateValue({ holdings, summary, allocationData: updatedAllocationData })
  }

  return (
    <div className={classes.root}>
      <Box className={classes.infoContainer}>
        <TextField className={classes.infoBox} value={capitalInput} error={capitalInput === ''} label={Rebalancing.capitalInput} onChange={handleCapitalInput} type='number' />
        <SettledCashCard settledCash={settledCash} />
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
          <TableBody>{allocations.map(
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
            <SecondaryField text={isExtra ? currencyFormatter(price) : shareText} />
          </Box>
        </Tooltip>
      </StyledTableCell>
      <StyledTableCell>
        <PrimaryField text={rateFormatter(ratio / 100)} />
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
