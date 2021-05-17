import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  }
}))

const Home = () => {
  const classes = useStyles()

  useEffect(() => {
    document.title = 'Exscientia | P.W.A.'
  })

  return (
    <div className={classes.root}>
      <pdbe-molstar molecule-id='1cbs'></pdbe-molstar>
    </div>
  )
}

export { Home }
