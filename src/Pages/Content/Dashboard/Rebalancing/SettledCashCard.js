import { useState, useEffect } from 'react'
import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { PrimaryField, SecondaryField } from '../Components'
import { currencyFormatter } from '../utils/common'
import { useLang } from '../../../../global/context/language'
import WarnSnackBar from '../../../../global/Components/WarningSnackbar'

const useStyles = makeStyles({
  root: {
    margin: '0 1rem'
  },
  insufficientBP: {
    color: '#f03e3e'
  },
  compactCardContent: {
    padding: '0.5rem 0.8rem', // default is too much
    '&:last-child': {
      paddingBottom: '0.5rem' // default is too much
    }
  }
})
const SettledCashCard = ({ settledCash }) => {
  const classes = useStyles()
  const { SettledCashCard } = useLang().lang.Rebalancing
  const [openBPInsufficientWarn, setOpenBPInsufficientWarn] = useState(settledCash < 0)

  useEffect(() => setOpenBPInsufficientWarn(settledCash < 0), [settledCash])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenBPInsufficientWarn(false)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.compactCardContent}>
          <PrimaryField className={(settledCash < 0 ? classes.insufficientBP : {})} text={currencyFormatter(settledCash)} />
          <SecondaryField text={SettledCashCard.title} />
        </CardContent>
      </Card>
      <WarnSnackBar warnText={SettledCashCard.warn} open={openBPInsufficientWarn} onClose={handleClose} />
    </>
  )
}

export default SettledCashCard
