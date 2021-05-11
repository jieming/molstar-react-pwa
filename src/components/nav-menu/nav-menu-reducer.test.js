import navMenuReducer from './nav-menu-reducer'

describe('nav-menu-reducer.test', () => {
  let currentState, nextState, action

  describe('Upon receiving SELECT-NAV-ITEM action', () => {
    beforeEach(() => {
      currentState = { selectedItem: undefined }

      action = {
        type: 'SELECT-NAV-ITEM',
        payload: { item: 'some-item' }
      }
      nextState = navMenuReducer(currentState, action)
    })

    it('should assign the selectedItem in next state', () => {
      expect(nextState).toEqual({ selectedItem: 'some-item' })
    })
  })

  describe('Upon receiving TOGGLE-NAV-EXPAND action', () => {
    beforeEach(() => {
      currentState = { expand: { Project: false } }

      action = {
        type: 'TOGGLE-NAV-EXPAND',
        payload: { item: 'Project' }
      }
      nextState = navMenuReducer(currentState, action)
    })

    it('should toggle the expand status of the action item', () => {
      expect(nextState).toEqual({ expand: { Project: true } })
    })
  })

  describe('Upon receiving TOGGLE-MENU-OPEN action', () => {
    beforeEach(() => {
      currentState = { open: false }
      nextState = navMenuReducer(currentState, { type: 'TOGGLE-MENU-OPEN' })
    })

    it('should toggle the menu open status', () => {
      expect(nextState).toEqual({ open: true })
    })
  })

  describe('Upon receiving unrecognized action', () => {
    beforeEach(() => {
      currentState = {
        selectedItem: 'somevalue',
        expand: { key: 'value' }
      }
      action = { type: 'UNRECGONIZED' }
      nextState = navMenuReducer(currentState, action)
    })

    it('should NOT change the  state', () => {
      expect(nextState).toEqual(currentState)
    })
  })
})
