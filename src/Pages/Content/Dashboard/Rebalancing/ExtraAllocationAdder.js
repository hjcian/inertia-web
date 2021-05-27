import { useState } from 'react'
import {
  Tooltip, TextField, CircularProgress, InputAdornment
} from '@material-ui/core'
import { useLang } from '../../../../global/context/language'

const enterKey = 13

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

export default ExtraAllocationAdder
