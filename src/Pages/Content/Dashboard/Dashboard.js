import {
  Switch,
  Route
} from 'react-router-dom'

import Rebalancing from './Rebalancing/Rebalancing'
import Holdings from './Holdings/Holdings'
import './Dashboard.css'

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
    <div className='Dashboard'>
      <Switcher />
    </div>
  )
}

export default Dashboard
