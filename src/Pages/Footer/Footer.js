import {
  // BrowserRouter,
  // Switch,
  // Route,
  Link
} from 'react-router-dom'

const APP_VERSION = 'v0.1.0'

const FooterNav = () => {
  return (
    <div className='FooterNav'>
      <Link className='FooterItem' to='/about'>About</Link>
      <Link className='FooterItem' to='/privacypolicy'>Privacy Policy</Link>
    </div>
  )
}

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='FooterTop'>

        <FooterNav />

        <div className='FooterItem'>
          {`${APP_VERSION}`}
        </div>
      </div>
      <div className='FooterBottom'>
        <div className='FooterItem'>
          © InertIA 2021. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer
