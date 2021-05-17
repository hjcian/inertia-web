import { FaExternalLinkAlt, FaLanguage } from 'react-icons/fa'
import { useLang, supportedLangs } from '../../global/LanguageContext'

const Header = () => {
  const { lang, switchLang } = useLang()
  const { Header } = lang
  const handleLangSelect = (e) => {
    switchLang(e.target.value)
  }

  return (
    <div className='Header'>
      <div className='HeaderLeft'>
        {Header.left}
      </div>
      <div className='HeaderRight'>
        <div className='HeaderRightItem'>
          <select onChange={handleLangSelect}>
            {supportedLangs.map(({ code, text }) =>
              <option key={code} value={code}>
                {text}
              </option>)}
          </select>
          <FaLanguage size='1.5em' />
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
