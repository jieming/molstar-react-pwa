import { combineReducers } from 'redux'
import navMenuReducer from './components/nav-menu/nav-menu-reducer'

const rootReducer = combineReducers({
  navMenu: navMenuReducer,
})

export default rootReducer
