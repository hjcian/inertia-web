import { Box } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

import InvestmentOverview from './InvestmentOverview'
import Holding from './Holdings'

import { useHoldings } from '../../../../global/context/holdings'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  part: {
    margin: '1rem 0 0.5rem'
  }
}))
const AssetOverview = () => {
  const classes = useStyles()
  const { holdings, summary, fetching } = useHoldings().value

  return (
    <Box className={classes.root}>
      <Box className={classes.part}>
        <InvestmentOverview summary={summary} fetching={fetching} />
      </Box>
      <Box className={classes.part}>
        <Holding holdings={holdings} fetching={fetching} />
      </Box>
    </Box>
  )
}

export default AssetOverview
