import Header from './Header/Header'
import Footer from './Footer/Footer'
import Content from './Content/Content'
import { ProvideHoldings } from '../global/HoldingsContext'
import './App.css'

function App () {
  return (
    <div className='App'>
      <Header />
      <ProvideHoldings>
        <Content />
      </ProvideHoldings>
      <Footer />
    </div>
  )
}

export default App
