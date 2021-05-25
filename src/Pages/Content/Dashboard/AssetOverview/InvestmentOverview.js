import { Typography, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useLang } from '../../../../global/context/language'
import { formatType, FormatNumber, withFetching } from '../utils/common'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardcontent: {
    padding: '0.5rem 0.8rem', // default is too much
    '&:last-child': {
      paddingBottom: '0.5rem' // default is too much
    }
  }
}))
const SummaryCard = ({ title, value, type, fetching }) => {
  const classes = useStyles()
  const FetchingInfo = withFetching(Typography, fetching)
  return (
    <Card>
      <CardContent className={classes.cardcontent}>
        <FetchingInfo variant='body2' color='textPrimary'>
          <FormatNumber type={type} value={value} />
        </FetchingInfo>
        <Typography variant='caption' color='textSecondary' component='p'>{title}</Typography>
      </CardContent>
    </Card>
  )
}

const InvestmentOverview = ({ summary, fetching }) => {
  const classes = useStyles()
  const { lang } = useLang()
  const {
    cashBP,
    totalCost,
    totalMarketValue,
    simpleReturn,
    annualReturn
  } = lang.Holdings.summaryPart
  const items = [
    { title: cashBP, value: summary.cashBP, type: formatType.currency, fetching: false },
    { title: totalCost, value: summary.totalCost, type: formatType.currency, fetching: false },
    { title: totalMarketValue, value: summary.totalMarketValue, type: formatType.currency, fetching },
    { title: simpleReturn, value: summary.simpleReturn, type: formatType.rate, fetching },
    { title: annualReturn, value: summary.annualReturn, type: formatType.rate, fetching }
  ]
  return (
    <div className={classes.root}>
      {items.map((item) => <SummaryCard key={item.title} {...item} />)}
    </div>
  )
}

export default InvestmentOverview
