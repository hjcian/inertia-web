import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import GitHubIcon from '@material-ui/icons/GitHub'

import { useLang, supportedLangs } from '../../global/context/language'
import logo from '../../images/logo.png'

const Header = () => {
  const { lang, switchLang } = useLang()
  const { Header, Code } = lang
  const handleLangChange = e => switchLang(e.target.value)
  return (
    <div className='Header'>
      <div className='HeaderBrandPart'>
        <a className='HeaderBrand' href='/'>
          <img className='HeaderBrandImage' src={logo} alt={Header.brand} />
        </a>
      </div>
      <div className='HeaderRight'>
        <div className='HeaderRightItem'>
          <Select
            value={Code}
            onChange={handleLangChange}
          >
            {supportedLangs.map(({ code, text }) =>
              <MenuItem key={code} value={code}>
                {text}
              </MenuItem>)}
          </Select>
        </div>
        <div className='HeaderRightItem'>
          <Tooltip title='Github' arrow>
            <IconButton
              href='https://github.com/hjcian/inertia-web'
              target='_blank' rel='noreferrer'
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Header
