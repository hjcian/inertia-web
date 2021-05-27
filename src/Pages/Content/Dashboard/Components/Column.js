import { Typography } from '@material-ui/core'

const Column = (props) => {
  return <Typography {...props} variant='body2' color='textSecondary'>{props.text}</Typography>
}
export default Column
