import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
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

const Footer = () => {
  const { lang } = useLang()
  const { version } = lang.Footer
  return (
    <div className='Footer'>
      {/* <FooterNav /> */}
      <div className='FooterItem'>
        <Typography component='div' variant='caption'>
          <Box fontStyle='italic'>
            © InertIA 2021. All Rights Reserved.
          </Box>
        </Typography>
      </div>
      <div className='FooterItem'>
        <Typography component='div' variant='caption'>
          <Box fontStyle='italic'>
            {`${version}: ${APP_VERSION}`}
          </Box>
        </Typography>
      </div>
    </div>
  )
}

export default Footer
