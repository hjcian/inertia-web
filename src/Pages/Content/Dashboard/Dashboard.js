import {
  Switch,
  Route
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

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
const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex'
  }
}))
const Dashboard = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Switcher />
    </div>
  )
}

export default Dashboard
