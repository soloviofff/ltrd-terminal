import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { WebSocketLink } from "@apollo/client/link/ws"


const getHeaders = () => {
  return {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.VUE_APP_HASURA_ADMIN_SECRET
    }
  }
}

const link = new WebSocketLink({
  uri: process.env.VUE_APP_HASURA_GRAPHQL_WSS,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: () => {
      return { headers: getHeaders() }
    },
  }
})


const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    loadingKey: 'loading',
    fetchPolicy: 'no-cache'
  }
})

export const apolloProvider = createApolloProvider({
  defaultClient: client,
})
