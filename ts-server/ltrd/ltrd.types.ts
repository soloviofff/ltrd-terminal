interface Fee {
  maker: number
  taker: number
}

interface OrderFee {
    currency: string      // which currency the fee is (usually quote)
    cost: number          // the fee amount in that currency
    rate: number          // the fee rate (if available)
}

interface Trade {
  info: Object // the original decoded JSON as is
  id: string // '12345-67890:09876/54321',  // string trade id
  timestamp: number // Unix timestamp in milliseconds
  datetime: string //    '2017-08-17 12:42:48.000',  // ISO8601 datetime with milliseconds
  symbol: string //      'ETH/BTC',  symbol
  order?: string  //     '12345-67890:09876/54321',  // string order id or undefined/None/null
  type: string   // order type, 'market', 'limit' or undefined/None/null
  side: string   // direction of the trade, 'buy' or 'sell'
  takerOrMaker: string // string, 'taker' or 'maker'
  price:  number // float price in quote currency
  amount: number  // amount of base currency
  cost: number  // total cost, `price * amount`,
  fee: OrderFee                // fee info, if available
}

interface Order {
  ltrd_id: number
  id: string               // 'abcdef-ghijklmnop-qrstuvwxyz', // a user-defined clientOrderId, if any
  clientOrderId: string    // a user-defined clientOrderId, if any
  datetime: string         // '2017-08-17 12:42:48.000', // ISO8601 datetime of 'timestamp' with milliseconds
  timestamp: number // 1502962946216, // order placing/opening Unix timestamp in milliseconds
  lastTradeTimestamp: number //1502962956216, // Unix timestamp of the most recent trade on this order
  status: string // 'open', 'closed', 'canceled', 'expired'
  symbol: string  //        // symbol 'ETH/BTC'
  type: string // 'market', 'limit'
  timeInForce: string // 'GTC', 'IOC', 'FOK', 'PO'
  side: string // 'buy', 'sell'
  price:  number  // float price in quote currency (may be empty for market orders)
  average: number // float average filling price
  amount: number //    ordered amount of base currency
  filled: number //   filled amount of base currency
  remaining: number // remaining amount to fill
  cost: number //   'filled' * 'price' (filling price used where available)
  trades: Trade[] // a list of order trades/executions
  fee: OrderFee                // fee info, if available
  info: Object // the original unparsed order structure as is
}




interface Config {
  api: Object
  symbol: string
  broker: string
  coinFrom: string
  coinTo: string
  lot: number
  pocket: number
  targetProfitPercent: number
  maxLevel: number
  levelStep: number
  fee: Fee
  balance: Object
  positionLimitsTimestamp: number,
  positionLimits: Order[],
  filledLimits: Order[],
  multipositionSourseOrders: Order[],
  multipositionInfo: Object,
  weighetInfo: Object
}
