import { FaExternalLinkAlt } from 'react-icons/fa'
import { Select, MenuItem } from '@material-ui/core'

import { useLang, supportedLangs } from '../../global/context/language'
import logo from '../../images/logo.png'

const Header = () => {
  const { lang, switchLang } = useLang()
  const { Header, Code } = lang
  const handleLangChange = e => switchLang(e.target.value)
  return (
    <div className='Header'>
      <div className='HeaderLeft'>
        <a className='HeaderLeftBrand' href='/'>
          <img className='HeaderLeftBrandImage' src={logo} alt={Header.brand} />
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
          <a
            href='https://github.com/hjcian/inertia-web'
            target='_blank' rel='noreferrer'
          >
            Github
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
