import { Typography, Card, CardContent } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { useLang } from '../../../../global/context/language'
import { Currency, Rate } from './NumberFormatter'

const currency = 'currency'
const rate = 'rate'

const SummaryItem = ({ classes, title, value, type }) => {
  return (
    <Card>
      <CardContent className={classes.cardcontent}>
        <Typography variant='body2' color='textPrimary'>
          {type === currency
            ? <Currency number={value} />
            : <Rate number={value} />}
        </Typography>
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

const StyledSummaryItem = withStyles(itemStyles)(SummaryItem)

const InvestmentOverview = ({ summary }) => {
  const { lang } = useLang()
  const { summaryPart } = lang.Holdings
  const summaryItems = [
    { title: summaryPart.totalCost, value: summary.totalCost, type: currency },
    { title: summaryPart.totalMarketValue, value: summary.totalMarketValue, type: currency },
    { title: summaryPart.simpleReturn, value: summary.simpleReturn, type: rate },
    { title: summaryPart.annualReturn, value: summary.annualReturn, type: rate }
  ]
  return (
    <>
      <Typography variant='h6' color='textPrimary'>{summaryPart.title}</Typography>
      <div className='InvestmentOverview'>
        {summaryItems.map((props) => <StyledSummaryItem key={props.title} {...props} />)}
      </div>
    </>
  )
}

export default InvestmentOverview
