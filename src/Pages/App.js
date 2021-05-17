import Header from './Header/Header'
import Footer from './Footer/Footer'
import Content from './Content/Content'
import { ProvideHoldings } from '../global/HoldingsContext'
import { ProvideLang } from '../global/LanguageContext'
import './App.css'

function App () {
  return (
    <div className='App'>
      <ProvideLang>
        <Header />
        <ProvideHoldings>
          <Content />
        </ProvideHoldings>
        <Footer />
      </ProvideLang>
    </div>
  )
}

export default App
