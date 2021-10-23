const {createLimitsSteps} = require('../components/createLimitsSteps')
global.sleepUntil = {}
global.JOURNAL = {
  stock: 'binance',
  symbol: 'BTC/USDT',
  coinFrom: 'BTC',
  coinTo: 'USDT',
  lot: 12,
  pocket: 48,
  timedelta: 50000,
  targetProfitPercent: 3,
  maxLevel: 10000,
  levelStep: 100,
  fee: {
    maker: 0.01,
    taker: 0.01
  },
  balance: {
  },
  positionLimitsTimestamp: 0,
  positionLimits: [],
  filledLimits: [],
  multipositionSourseOrders: [],
  multipositionInfo: {}
}
global.ORDERBOOK = {
  bids: [
    [480, 400]
  ]
}

global.CCXT = {
  'notSafe': {
    createOrderCounter: 0,
    has: {
      'createOrder': true
    },
    createOrder: async function (symbol, type, side, amount, price) {

      this.createOrderCounter += 1
      // console.log('createOrderTest', this.createOrderCounter)
      // console.log(symbol, type, side, amount, price)
      const order = {
        id: 'test_buy_id_'+ this.createOrderCounter,
        amount: amount,
        symbol: symbol,
        type: type,
        side: side,
        price: price,
        filled: 0,
        status: 'open',
        timestamp: Date.now()
      }
      return order
    }
  }
}

it('test createLimitsSteps', async () => {
  await createLimitsSteps()
  // console.log(global.JOURNAL)
  expect(global.JOURNAL.positionLimits.length).toEqual(4)
});
