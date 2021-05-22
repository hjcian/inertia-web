import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'

import CopyrightIcon from '@material-ui/icons/Copyright'
import { makeStyles } from '@material-ui/core/styles'

import { useLang } from '../../global/context/language'

// import {
//   Link
// } from 'react-router-dom'

const APP_VERSION = '0.1.0'

// const FooterNav = () => {
//   return (
//     <div className='FooterNav'>
//       <Link className='FooterItem' to='/about'>About</Link>
//       <Link className='FooterItem' to='/privacypolicy'>Privacy Policy</Link>
//     </div>
//   )
// }
const useStyles = makeStyles((theme) => ({
  appBar: {
    color: '#1864ab',
    backgroundColor: '#e7f5ff',
    top: 'auto',
    bottom: 0
  },
  appBarWrapper: {
    width: '50%',
    margin: '0 auto'
  },
  copyrightIcon: {
    fontSize: '1rem'
  },
  rightsText: {
    fontStyle: 'italic',
    flexGrow: 1
  },
  versionText: {
    fontStyle: 'italic'
  }
}))

const Footer = () => {
  const classes = useStyles()
  const { lang } = useLang()
  const { version } = lang.Footer
  return (
    <AppBar position='fixed' className={classes.appBar} elevation={0}>
      <Toolbar className={classes.appBarWrapper} variant='dense'>
        {/* <FooterNav /> */}
        <CopyrightIcon className={classes.copyrightIcon} />
        <Typography className={classes.rightsText} component='div' variant='caption'>
          InertIA 2021. All Rights Reserved.
        </Typography>
        <Typography className={classes.versionText} component='div' variant='caption'>
          {`${version}: ${APP_VERSION}`}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
