import { Typography, Card, CardContent } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useLang } from '../../../../global/context/language'
import { formatType, FormatNumber, withFetching } from './common'

const SummaryCard = ({ classes, title, value, type, fetching }) => {
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

const itemStyles = {
  cardcontent: {
    padding: '0.5rem 0.8rem', // default is too much
    '&:last-child': {
      paddingBottom: '0.5rem' // default is too much
    }
  }
}

const StyledSummaryCard = withStyles(itemStyles)(SummaryCard)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))
const InvestmentOverview = ({ summary, fetching }) => {
  const classes = useStyles()
  const { lang } = useLang()
  const { summaryPart } = lang.Holdings
  const items = [
    { title: summaryPart.totalCost, value: summary.totalCost, type: formatType.currency, fetching: false },
    { title: summaryPart.totalMarketValue, value: summary.totalMarketValue, type: formatType.currency, fetching },
    { title: summaryPart.simpleReturn, value: summary.simpleReturn, type: formatType.rate, fetching },
    { title: summaryPart.annualReturn, value: summary.annualReturn, type: formatType.rate, fetching }
  ]
  return (
    <div className={classes.root}>
      {items.map((item) => <StyledSummaryCard key={item.title} {...item} />)}
    </div>
  )
}

export default InvestmentOverview
