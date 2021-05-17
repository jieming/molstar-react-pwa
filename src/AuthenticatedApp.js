import React from 'react'
import { Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Home } from './components/home/Home'

const useStyles = makeStyles(theme => ({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  contentFrame: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  appContent: {
    flex: 1
  }
}))

const AuthenticatedApp = () => {
  const classes = useStyles()

  return (
    <div className={classes.appContainer}>
      <div className={classes.contentFrame}>
        <div className={classes.appContent}>
          <Route exact path='/' component={Home} />
        </div>
      </div>
    </div>
  )
}

export default AuthenticatedApp
