import React from 'react'
import { Switch } from 'react-router-dom'
import { DebugPanel } from '@centaur-ui/core'
import './App.css'
import AuthenticatedApp from './AuthenticatedApp'

function App() {
  return (
    <div className='App'>
      <Switch>
        <AuthenticatedApp />
      </Switch>
      <DebugPanel />
    </div>
  )
}

export default App
