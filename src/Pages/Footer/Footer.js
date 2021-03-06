import {
  Box,
  Link,
  Toolbar,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { useLang } from '../../global/context/language'

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Noto Sans',
    color: '#1864ab',
    backgroundColor: '#e7f5ff',
    width: '100vw',
    marginTop: 'auto',
    bottom: 0
  },
  appBarWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '60vw',
    margin: '0 auto'
  },
  copyrightIcon: {
    fontSize: '1rem',
    marginRight: '0.1rem'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    padding: '0.5rem 0',
    margin: '0 0.7rem'
  },
  copyRights: {
    flexGrow: 1
  },
  containerTitle: {
    fontSize: '0.8rem',
    marginBottom: '0.3rem'
  },
  creditItem: {
    fontSize: '0.7rem'
  },
  gitHubIcon: {
    fontSize: '1rem'
  }
}))

const Footer = () => {
  const classes = useStyles()
  const { lang } = useLang()
  const { credit, contact } = lang.Footer
  const since = 2021
  const nowYear = new Date().getFullYear()
  return (
    <footer className={classes.root}>
      <Toolbar className={classes.appBarWrapper}>

        <Box className={`${classes.container} ${classes.copyRights}`}>
          <Typography className={classes.containerTitle} component='div' variant='caption'>
            &reg; InertIA {nowYear > 2021 ? `${since}-${nowYear}` : since}. All Rights Reserved.
          </Typography>
        </Box>

        <Box className={classes.container}>
          <Typography className={classes.containerTitle} component='div' variant='caption'>
            {credit}
          </Typography>
          <Link className={classes.creditItem} href='https://themeisle.com/illustrations/' target='_blank' rel='noreferrer'>themeisle.com</Link>
          <Link className={classes.creditItem} href='https://undraw.co/illustrations' target='_blank' rel='noreferrer'>undraw.co</Link>
        </Box>

        <Box className={classes.container}>
          <Typography className={classes.containerTitle} component='div' variant='caption'>
            {contact}
          </Typography>
          <Link className={classes.creditItem} href='https://github.com/hjcian/inertia-web' target='_blank' rel='noreferrer'>Github</Link>
          <Link className={classes.creditItem} href='https://www.facebook.com/Inert-Investment-Assistant-102334822055864' target='_blank' rel='noreferrer'>Facebook</Link>
        </Box>

      </Toolbar>
    </footer>
  )
}

export default Footer
