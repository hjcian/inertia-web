
import { CircularProgress } from '@material-ui/core'

export const formatType = {
  currency: 'currency',
  rate: 'rate'
}

const largeNum = 10000
const largeFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

export const currencyFormatter = (number) => {
  return number > largeNum ? largeFormatter.format(number) : `$ ${number.toFixed(2)}`
}

export const Currency = ({ number }) => {
  return (<>{number > largeNum ? largeFormatter.format(number) : `$ ${number.toFixed(2)}`}</>)
}

export const Rate = ({ number }) => {
  const rate = number * 100
  return (<>{`${rate.toFixed(2)} %`}</>)
}

export const FormatNumber = ({ type, value }) => {
  return (type === formatType.currency
    ? <Currency number={value} />
    : <Rate number={value} />
  )
}

export const withFetching = (WrappedComponent, fetching) => {
  const HOC = (props) => {
    return (fetching
      ? <CircularProgress size='1rem' thickness={6} />
      : <WrappedComponent {...props} />)
  }
  return HOC
}
