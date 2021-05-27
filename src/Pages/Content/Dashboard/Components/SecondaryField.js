import { Typography } from '@material-ui/core'

const SecondaryField = (props) => {
  return <Typography {...props} variant='caption' color='textSecondary'>{props.text}</Typography>
}

export default SecondaryField
