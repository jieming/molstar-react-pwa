import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import React, { useEffect, useState } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center'
  },
  viewButton: {
    marginTop: theme.spacing(1)
  }
}))

const Home = () => {
  const classes = useStyles()

  useEffect(() => {
    document.title = 'MolStar | P.W.A.'
  })

  const [structureId, setStructureId] = useState('')
  const [diplay3D, setDisplay3D] = useState(false)

  const onIdChange = event => setStructureId(event.target.value)

  const onViewClick = () => setDisplay3D(true)

  const renderStructureIDInput = () => (
    <div className={classes.inputRoot}>
      <TextField
        label='Structure ID'
        placeholder='e.g. 2vta'
        onChange={onIdChange}
        value={structureId}
      />
      <Button
        className={classes.viewButton}
        variant='contained'
        onClick={onViewClick}
      >
        3D View
      </Button>
    </div>
  )

  return (
    <div className={classes.root}>
      {diplay3D ? (
        <pdbe-molstar molecule-id={structureId} />
      ) : (
        renderStructureIDInput()
      )}
    </div>
  )
}

export { Home }
