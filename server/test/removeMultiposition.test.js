const {removeMultiposition} = require('../components/removeMultiposition')

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
  positionLimits: [],
  filledLimits: [

  ],
  multipositionSourseOrders: [
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
  multipositionInfo: {
    order: {
      id: 'test_sell',
      amount: 0.08,
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'sell',
      price: 420,
      filled: 0,
      timestamp: 1591093059785
    }
  }
}
global.CCXT = {
  'notSafe': {
    has: {
      'cancelOrder': true
    },
    cancelOrder: async function(id, symbol) {
      return {
        id: id,
        symbol: symbol
      }
    }
  }
}

it('test removeMultiposition', async () => {
  await removeMultiposition()
  // console.log(global.JOURNAL)
  expect(global.JOURNAL.filledLimits.length).toEqual(2)
  expect(global.JOURNAL.multipositionSourseOrders.length).toEqual(0)
});
