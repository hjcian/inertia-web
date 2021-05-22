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
