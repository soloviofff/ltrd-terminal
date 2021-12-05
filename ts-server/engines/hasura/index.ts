// import fetch from 'node-fetch'
// import * as fetch from 'cross-fetch'
import fetch from 'isomorphic-fetch'
import { createHttpLink } from "apollo-link-http"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { execute } from 'apollo-link'
import { version } from 'graphql'

require('dotenv').config()

export default class HasuraDb {
  client = null
  constructor() {
    this.init()
  }

  init() {
    this.client = new ApolloClient({
      link: createHttpLink(
        {
          uri: process.env.HASURA_GRAPHQL_API,
          fetch: fetch,
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
          }
        }
      ),
      cache: new InMemoryCache(),
    });
  }

  get getClient() {
    return this.client
  }


}
