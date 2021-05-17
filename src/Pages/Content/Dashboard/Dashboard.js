import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Rebalancing from './Rebalancing/Rebalancing'
import Holdings from './Holdings/Holdings'
import './Dashboard.css'

const NavSidebar = () => {
  return (
    <div className='NavSidebar'>
      <Link to='/holdings'>Holdings</Link>
      <Link to='/rebalancing'>Rebalancing</Link>
    </div>
  )
}

const Switcher = () => {
  return (
    <Switch>
      <Route path='/rebalancing'>
        <Rebalancing />
      </Route>
      <Route path='/'>
        <Holdings />
      </Route>
    </Switch>
  )
}

const Dashboard = () => {
  return (
    <BrowserRouter>
      <div className='Dashboard'>
        <NavSidebar />
        <Switcher />
      </div>
    </BrowserRouter>
  )
}

export default Dashboard
