import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { logout } from '@centaur-ui/core'

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(
    decodeURIComponent(localStorage.getItem('AUTH_DATA'))
  ).token

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const unauthorizedLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    logout()
  }
})

const httpLink = createHttpLink({
  //TODO: change the API url to match your endpoint
  uri: `/api/core/projects/readonly`
})

const client = new ApolloClient({
  link: unauthorizedLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache()
})

export default client
