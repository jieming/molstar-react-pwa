const initialState = {
  selectedItem: 'Home',
  expand: {
    Analysis: true,
    Design: true
  },
  open: true
}

const navMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT-NAV-ITEM': {
      return { ...state, selectedItem: action.payload.item }
    }
    case 'TOGGLE-NAV-EXPAND': {
      const newState = JSON.parse(JSON.stringify(state))
      newState.expand[`${action.payload.item}`] = !state.expand[
        `${action.payload.item}`
      ]
      return newState
    }
    case 'TOGGLE-MENU-OPEN': {
      return { ...state, open: !state.open }
    }
    default:
      return state
  }
}

export default navMenuReducer
