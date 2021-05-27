
import { CircularProgress } from '@material-ui/core'

const largeNum = 10000
const largeFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

export const currencyFormatter = (number) => {
  return number > largeNum ? largeFormatter.format(number) : `$ ${number.toFixed(2)}`
}

export const rateFormatter = (number) => {
  const rate = number * 100
  return `${rate.toFixed(2)} %`
}

export const withFetching = (WrappedComponent, fetching) => {
  const HOC = (props) => {
    return (fetching
      ? <CircularProgress size='1rem' thickness={6} />
      : <WrappedComponent {...props} />)
  }
  return HOC
}
