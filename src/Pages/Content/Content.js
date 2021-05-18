import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Dashboard from './Dashboard/Dashboard'
import DataImporter from './DataImporter/DataImporter'
import About from './About'
import { useHoldings } from '../../global/context/holdings'
import './Content.css'

const NavSidebar = () => {
  return (
    <div className='NavSidebar'>
      <Link to='/'>Holdings</Link>
      <Link to='/rebalancing'>Rebalancing</Link>
    </div>
  )
}

const Content = () => {
  const { holdings } = useHoldings()
  return (
    <div className='Content'>
      {
        holdings !== null
          ? <NavSidebar />
          : null
      }
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/privacypolicy'>
          <h3>Privacy Policy</h3>
        </Route>
        <Route path='/'>
          {
            holdings === null
              ? <DataImporter />
              : <Dashboard />
          }
        </Route>
      </Switch>
    </div>
  )
}
export default Content
