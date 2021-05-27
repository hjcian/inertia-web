import { Typography } from '@material-ui/core'

const PrimaryField = (props) => {
  return <Typography {...props} variant='body2' color='textPrimary'>{props.text}</Typography>
}

export default PrimaryField
