import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { SnackbarProvider } from 'notistack'
import client from './apollo-client'

import { Provider } from 'react-redux'
import store from './redux-store'

import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '@centaur-ui/core'

import App from './App'

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()