import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const autoHideDuration = 6000 // ms

const WarnSnackBar = ({ warnText, isOpen, closer }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    closer(false)
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='error'>
        {warnText}
      </Alert>
    </Snackbar>
  )
}

export default WarnSnackBar
