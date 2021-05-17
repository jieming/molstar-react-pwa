import React from 'react'
import { Switch } from 'react-router-dom'
import './App.css'
import AuthenticatedApp from './AuthenticatedApp'

function App() {
  return (
    <div className='App'>
      <Switch>
        <AuthenticatedApp />
      </Switch>
    </div>
  )
}

export default App
