import React from 'react'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe('App render test', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  })

  it('should display unauthenticated page', () => {
    expect(screen.queryByTestId('unauthenticated-title')).toBeInTheDocument()
  })
})
