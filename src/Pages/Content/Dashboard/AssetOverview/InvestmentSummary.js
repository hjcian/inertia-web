import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useLang } from '../../../../global/context/language'
import { withFetching, currencyFormatter, rateFormatter } from '../utils/common'
import { PrimaryField, SecondaryField } from '../Components'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  compactCardContent: {
    padding: '0.5rem 0.8rem', // default is too much
    '&:last-child': {
      paddingBottom: '0.5rem' // default is too much
    }
  }
}))
const SummaryCard = ({ title, value, fetching, formatter }) => {
  const classes = useStyles()
  const FetchingPrimaryField = withFetching(PrimaryField, fetching)
  return (
    <Card>
      <CardContent className={classes.compactCardContent}>
        <FetchingPrimaryField text={formatter(value)} />
        <SecondaryField text={title} />
      </CardContent>
    </Card>
  )
}

const InvestmentSummary = ({ summary, fetching }) => {
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
    { title: cashBP, value: summary.cashBP, fetching: false, formatter: currencyFormatter },
    { title: totalCost, value: summary.totalCost, fetching: false, formatter: currencyFormatter },
    { title: totalMarketValue, value: summary.totalMarketValue, fetching, formatter: currencyFormatter },
    { title: simpleReturn, value: summary.simpleReturn, fetching, formatter: rateFormatter },
    { title: annualReturn, value: summary.annualReturn, fetching, formatter: rateFormatter }
  ]
  return (
    <div className={classes.root}>
      {items.map((item) => <SummaryCard key={item.title} {...item} />)}
    </div>
  )
}

export default InvestmentSummary
