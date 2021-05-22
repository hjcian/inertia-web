import {
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  IconButton,
  Tooltip
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import TranslateIcon from '@material-ui/icons/Translate'
import { makeStyles } from '@material-ui/core/styles'

import { useLang, supportedLangs } from '../../global/context/language'
import logo from '../../images/logo.png'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#e7f5ff'
  },
  appBarWrapper: {
    width: '50%',
    margin: '0 auto'
  },
  appBarTitle: {
    flexGrow: 1
  },
  brandImage: {
    width: '75px'
  },
  selectLang: {
    margin: '0 0.5rem',
    fontSize: '0.8rem',
    minWidth: '3rem'
  },
  selectLangItem: {
    fontSize: '0.8rem'
  },
  githubButton: {
  },
  githubIcon: {
    color: '#1864ab'
  }
}))
const Header = () => {
  const classes = useStyles()
  const { lang, switchLang } = useLang()
  const { Header, Code } = lang
  const handleLangChange = e => switchLang(e.target.value)
  return (
    <>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar className={classes.appBarWrapper} variant='dense'>
          <div className={classes.appBarTitle}>
            <a href='/'>
              <img className={classes.brandImage} src={logo} alt={Header.brand} />
            </a>
          </div>
          <Select
            disableUnderline
            className={classes.selectLang}
            startIcon={TranslateIcon}
            value={Code}
            onChange={handleLangChange}
          >
            {supportedLangs.map(({ code, text }) =>
              <MenuItem
                className={classes.selectLangItem}
                key={code}
                value={code}
              >
                {text}
              </MenuItem>)}
          </Select>
          <Tooltip title='Github' arrow>
            <IconButton
              className={classes.githubButton}
              href='https://github.com/hjcian/inertia-web'
              target='_blank' rel='noreferrer'
            >
              <GitHubIcon className={classes.githubIcon} />
            </IconButton>
          </Tooltip> {/* need fixed placement: https://material-ui.com/components/app-bar/#fixed-placement */}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
