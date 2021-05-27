import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const autoHideDuration = 6000 // ms

const WarnSnackBar = ({ warnText, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity='error'>
        {warnText}
      </Alert>
    </Snackbar>
  )
}

export default WarnSnackBar
