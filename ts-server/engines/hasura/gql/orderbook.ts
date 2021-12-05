const gql = require('graphql-tag');


export const INSERT_ORDERBOOK_ONE = gql`
  mutation MyMutation(
    $asks: jsonb,
    $bids: jsonb,
    $broker: String,
    $exchange: String,
    $isin: String,
    $pair: String,
    $timestamp: Int,
    $trade_status: Boolean = false
  ) {
    insert_orderbooks_one(
      object: {
        asks: $asks,
        bids: $bids,
        broker: $broker,
        exchange: $exchange,
        isin: $isin,
        pair: $pair,
        timestamp: $timestamp,
        trade_status: $trade_status
    }
    ) {
      id
      timestamp
    }
  }
`
