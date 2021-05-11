import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import NavMenu from './NavMenu'

const ComponentName = () => {
  const navState = useSelector(state => state.navMenu)
  const dispatch = useDispatch()

  return <NavMenu navState={navState} dispatch={dispatch} />
}

export default ComponentName
