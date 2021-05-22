import MessengerCustomerChat from 'react-messenger-customer-chat'
import { CssBaseline } from '@material-ui/core'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Content from './Content/Content'
import { ProvideHoldings } from '../global/context/holdings'
import { ProvideLang } from '../global/context/language'
import './App.css'

import {
  BrowserRouter
} from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <CssBaseline />
      <MessengerCustomerChat pageId='102334822055864' appId='248649133720997' />
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
