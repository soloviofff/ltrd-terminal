const {placeMultiposition} = require('../components/placeMultiposition')

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
  positionLimits: [
    {
      id: 'test_buy_id_3',
      amount: 0.06,
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      price: 200,
      filled: 0,
      status: 'open',
      timestamp: 1591093060116
    },
    {
      id: 'test_buy_id_4',
      amount: 0.12,
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      price: 100,
      filled: 0,
      status: 'open',
      timestamp: 1591093060447
    }
  ],
  filledLimits: [
    {
      id: 'test_buy_id_1',
      amount: 0.03,
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      price: 400,
      filled: 0.03,
      status: 'filled',
      timestamp: 1591093059444
    },
    {
      id: 'test_buy_id_2',
      amount: 0.04,
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      price: 300,
      filled: 0.04,
      status: 'filled',
      timestamp: 1591093059785
    },
  ],
  multipositionSourseOrders: [],
  multipositionInfo: {}
}
global.CCXT = {
  'notSafe': {
    has: {
      'createOrder': true
    },
    createOrder: async function (symbol, type, side, amount, price) {
      const order = {
        id: 'test_sell_id',
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

it('test placeMultiposition', async () => {
  await placeMultiposition()
  // console.log(global.JOURNAL)
  expect(global.JOURNAL.filledLimits.length).toEqual(0)
  expect(global.JOURNAL.multipositionSourseOrders.length).toEqual(2)
  expect(global.JOURNAL.multipositionInfo.order.price).toEqual(353.21)
  expect(global.JOURNAL.multipositionInfo.weighetInfo.weightedPrice).toEqual(342.85714285714283,)
});
