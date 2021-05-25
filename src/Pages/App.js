// import MessengerCustomerChat from 'react-messenger-customer-chat'
import { CssBaseline } from '@material-ui/core'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Content from './Content/Content'
import { ProvideHoldings } from '../global/context/holdings'
import { ProvideLang } from '../global/context/language'
import { makeStyles } from '@material-ui/core/styles'

import {
  BrowserRouter
} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))
function App () {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <ProvideLang>
        <BrowserRouter>
          <Header />
          <ProvideHoldings>
            <Content />
          </ProvideHoldings>
          <Footer />
        </BrowserRouter>
      </ProvideLang>
    </div>
  )
}

export default App
