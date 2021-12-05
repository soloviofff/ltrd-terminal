// const orders_manager = require('./orders_manager')

import { execute } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import ws from 'ws'

require('dotenv').config()

// TODO: refactor to class instance

const getWsClient = (wsurl) => {
  const client = new SubscriptionClient(
    wsurl,
    {
      reconnect: true,
      timeout: 30000,
      connectionParams: () => {
        return { headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
        } };
      },
    },
    ws
  );
  return client;
};

// wsurl: GraphQL endpoint
// query: GraphQL query (use gql`` from the 'graphql-tag' library)
// variables: Query variables object
const createSubscriptionObservable = (wsurl, query, variables) => {
  const link = new WebSocketLink(getWsClient(wsurl));
  return execute(link, {query: query, variables: variables});
};


const gql = require('graphql-tag');
const SUBSCRIBE_QUERY = gql`
  subscription orders($stage: String) {
    orders(where: {stage: {_eq: $stage}}) {
      data
      id
      operation
      result
      stage
      status
      user
    },
  }
`;

export const orders_listener = async () => {
  const subscriptionClient = createSubscriptionObservable(
    process.env.HASURA_GRAPHQL_WSS,
    SUBSCRIBE_QUERY,
    {stage: 'init'}
  );
  var consumer = subscriptionClient.subscribe(eventData => {
    // Do something on receipt of the event
    console.log("Received event: ");
    // console.log(JSON.stringify(eventData, null, 2));
    console.log(eventData.data)
  }, (err) => {
    console.log('Err');
    console.log(err);
  });
}
