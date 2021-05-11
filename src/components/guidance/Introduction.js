import React, { useEffect } from 'react'
import { Paper, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@centaur-ui/core'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    height: '100%',
    flex: 1,
    background: colors.common.grey.light
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(20),
    paddingTop: theme.spacing(5)
  },
  divider: {
    margin: theme.spacing(3, 0)
  },
  text: {
    opacity: 0.8,
    paddingBottom: theme.spacing(1)
  },
  signature: {
    paddingTop: theme.spacing(13)
  }
}))

const Introduction = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Introduction'
    dispatch({ type: 'SELECT-NAV-ITEM', payload: { item: 'Introduction' } })
  }, [dispatch])

  const getTextLink = (label, link) => (
    <a href={link} target='_blank' rel='noopener noreferrer'>
      {label}
    </a>
  )

  const renderGreetings = () => (
    <Typography variant='subtitle1' className={classes.text}>
      Congratuations Centaur developer, seeing this page means you've
      successfully bootstrapped the application!
    </Typography>
  )

  const renderUsefulLinks = () => (
    <>
      <Typography variant='subtitle1' className={classes.text}>
        In Centaur client-side, there are three main technologies involved:
        ReactJS, Material-UI and Apollo.
      </Typography>
      <Typography variant='subtitle1' className={classes.text}>
        <li>
          {getTextLink(
            'ReactJS',
            'https://reactjs.org/docs/getting-started.html'
          )}{' '}
          - Component-based skeleton framework using JSX.
        </li>
        <li>
          {getTextLink(
            'Material UI',
            'https://reactjs.org/tutorial/tutorial.html#what-is-react'
          )}{' '}
          - React implementation of Google's{' '}
          {getTextLink(
            'Material Design',
            'https://material.io/design/introduction#principles'
          )}{' '}
          theory. One of the best UI libraries in React world.
        </li>
        <li>
          {getTextLink('Apollo', 'https://www.apollographql.com/docs/')} - Most
          popular {getTextLink('GraphQL', 'https://graphql.org/')} client
          library.
        </li>
      </Typography>
      <Typography variant='subtitle1' className={classes.text}>
        Beside the libraries above, below libraries also play an important role:
      </Typography>
      <Typography variant='subtitle1' className={classes.text}>
        <li>
          {getTextLink(
            'React Router',
            'https://reactrouter.com/web/guides/quick-start'
          )}{' '}
          - Controls client side routing.
        </li>
        <li>
          {getTextLink(
            'React Testing Library',
            'https://testing-library.com/docs/react-testing-library/intro'
          )}{' '}
          - A Jest-based unit testing library focusing on DOM rendering and
          interaction test.
        </li>
        <li>
          {getTextLink(
            'React Redux',
            'https://react-redux.js.org/introduction/quick-start'
          )}{' '}
          - Official Redux library for React, which provides flexbile data
          binding.
        </li>
      </Typography>
    </>
  )

  const renderFrontendDevGuide = () => (
    <>
      <Typography variant='subtitle1' className={classes.text}>
        The Engineering Team created a{' '}
        {getTextLink(
          'documentation',
          'https://exscientia.atlassian.net/wiki/spaces/EN/pages/697303051/Developing+Centaur+Frontends'
        )}{' '}
        which will help integrating your app into the Centaur platform.
      </Typography>
      <div className={classes.signature}>
        <Typography variant='subtitle1' className={classes.text}>
          Happy hacking!
        </Typography>
        <Typography variant='subtitle1' className={classes.text}>
          {getTextLink(
            'Exscientia Engineering Team',
            'https://exscientia.atlassian.net/wiki/spaces/EN/overview'
          )}
        </Typography>
      </div>
    </>
  )

  return (
    <Paper square className={classes.container}>
      <div className={classes.content}>
        {renderGreetings()}
        <Divider className={classes.divider} />
        {renderUsefulLinks()}
        <Divider className={classes.divider} />
        {renderFrontendDevGuide()}
      </div>
    </Paper>
  )
}

export default Introduction
