import {
  Switch,
  Route
} from 'react-router-dom'

import Rebalancing from './Rebalancing/Rebalancing'
import AssetOverview from './AssetOverview/AssetOverview'

const Switcher = () => {
  return (
    <Switch>
      <Route path='/rebalancing'>
        <Rebalancing />
      </Route>
      <Route path='/'>
        <AssetOverview />
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
