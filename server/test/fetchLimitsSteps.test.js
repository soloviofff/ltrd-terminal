const {fetchLimitsSteps} = require('../components/fetchLimitsSteps')

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
  positionLimits: [ 
    {
      id: 'test_buy_id_1',
      amount: 0.03,
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      price: 400,
      filled: 0,
      status: 'open',
      timestamp: 1591093059444
    },
    {
      id: 'test_buy_id_2',
      amount: 0.04,
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      price: 300,
      filled: 0,
      status: 'open',
      timestamp: 1591093059785
    },
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
  filledLimits: [],
  multipositionSourseOrders: [],
  multipositionInfo: {}
}


global.CCXT = {
  'notSafe': {
    has: {
      'fetchOrder': true
    },
    fetchOrder: function (payload) {
      // console.log('fetchOrderTest')
      const index = global.JOURNAL.positionLimits.findIndex(item => item.id === payload);
      let situation
      if (index !== -1) {
        situation = global.JOURNAL.positionLimits[index]
      }
      if (payload === 'test_buy_id_1' || payload === 'test_buy_id_2') {
        situation.filled = situation.amount
        situation.status = 'filled'
      }
      return situation
    }
  }
}


it('test fetchLimitsSteps', async () => {
  await fetchLimitsSteps()
  expect(global.JOURNAL.positionLimits.length).toEqual(2)
  expect(global.JOURNAL.filledLimits.length).toEqual(2)
});