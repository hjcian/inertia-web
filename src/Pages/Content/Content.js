import {
  Switch,
  Route,
  Link
} from 'react-router-dom'
import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExposureIcon from '@material-ui/icons/Exposure'
import Dashboard from './Dashboard/Dashboard'
import LandingPage from './LandingPage/LandingPage'
// import About from './About'
import { useHoldings } from '../../global/context/holdings'
import { useLang } from '../../global/context/language'
import './Content.css'

const NavSidebar = () => {
  const { lang } = useLang()
  const { assetOverview, rebalancing } = lang.Content
  return (
    <div className='NavSidebar'>
      <ListItem button component={Link} to='/'>
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary={<Typography variant='button'>{assetOverview}</Typography>} />
      </ListItem>
      <ListItem button component={Link} to='/rebalancing'>
        <ListItemIcon><ExposureIcon /></ListItemIcon>
        <ListItemText primary={<Typography variant='button'>{rebalancing}</Typography>} />
      </ListItem>
    </div>
  )
}

const Content = () => {
  const { value: holdings } = useHoldings()
  return (
    <div className={holdings ? 'ContentBase ContentWithData' : null}>
      {
        holdings !== null
          ? <NavSidebar />
          : null
      }
      <Switch>
        {/* <Route path='/about'>
          <About />
        </Route>
        <Route path='/privacypolicy'>
          <h3>Privacy Policy</h3>
        </Route> */}
        <Route path='/'>
          {
            holdings === null
              ? <LandingPage />
              : <Dashboard />
          }
        </Route>
      </Switch>
    </div>
  )
}
export default Content
