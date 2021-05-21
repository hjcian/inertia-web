
const largeNum = 10000
const largeFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

export const Currency = ({ number }) => {
  return (<>{number > largeNum ? largeFormatter.format(number) : `$ ${number.toFixed(2)}`}</>)
}

export const Rate = ({ number }) => {
  const rate = number * 100
  return (<>{`${rate.toFixed(2)} %`}</>)
}
