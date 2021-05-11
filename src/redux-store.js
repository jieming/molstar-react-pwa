import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './root-reducer'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('centaur-state')
    if (serializedState) {
      return JSON.parse(serializedState)
    }
  } catch (error) {
    return undefined
  }
}

const saveState = state => {
  const serializedState = JSON.stringify(state)
  localStorage.setItem('centaur-state', serializedState)
}

const store = createStore(rootReducer, loadState(), composeWithDevTools(applyMiddleware()))
store.subscribe(() => {
  saveState(store.getState())
})

export default store
