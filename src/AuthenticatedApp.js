import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { StatelessHeader } from '@centaur-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import NavMenuContainer from './components/nav-menu/NavMenuContainer'
import Introduction from './components/guidance/Introduction'

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
  const dispatch = useDispatch()

  const menuToggler = () => dispatch({ type: 'TOGGLE-MENU-OPEN' })

  return (
    <div className={classes.appContainer}>
      <StatelessHeader toggleNavMenu={menuToggler} />
      <div className={classes.contentFrame}>
        <NavMenuContainer />
        <div className={classes.appContent}>
          <Route
            exact
            path='/'
            component={() => <Redirect to='introduction' />}
          />
          <Route exact path='/introduction' component={Introduction} />
        </div>
      </div>
    </div>
  )
}

export default AuthenticatedApp
