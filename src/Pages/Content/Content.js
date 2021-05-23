import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard'
import ExposureIcon from '@material-ui/icons/Exposure'
import Dashboard from './Dashboard/Dashboard'
import LandingPage from './LandingPage/LandingPage'

import { makeStyles } from '@material-ui/core/styles'
import { useHoldings } from '../../global/context/holdings'
import { useLang } from '../../global/context/language'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '50vw'
  },
  navBar: {
    display: 'flex'
  }
}))

const NavSidebar = () => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  const { lang } = useLang()
  const { assetOverview, rebalancing } = lang.Content
  return (
    <Box borderBottom={0.5} className={classes.navBar}>
      <ListItem
        button component={Link} to='/'
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary={<Typography variant='button'>{assetOverview}</Typography>} />
      </ListItem>
      <ListItem
        button component={Link} to='/rebalancing'
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon><ExposureIcon /></ListItemIcon>
        <ListItemText primary={<Typography variant='button'>{rebalancing}</Typography>} />
      </ListItem>
    </Box>
  )
}

const Content = () => {
  const classes = useStyles()
  const { value: holdings } = useHoldings()
  return (
    <div className={classes.root}>
      {
        holdings !== null
          ? <NavSidebar />
          : null
      }
      <Switch>
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
