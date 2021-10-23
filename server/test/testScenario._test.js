const {manager} = require('../components/manager')
const _ = require('lodash')

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
      'fetchOrder': true,
      'createOrder': true
    },
    createOrder: function ( symbol, type, side, amount, price) {
      if (side === 'buy') {
        this.createOrderCounter += 1
        // console.log('createOrderTest', this.createOrderCounter)
        // console.log(symbol, type, side, amount, price)
        var order = {
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
        console.log(order.id)
        console.log(order.timestamp)
        return order
      } if (side === 'sell') {
        var order = {
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
}

describe('create orders => emulate too buys => emulate their sell => check accounting info', () => {
  it('test Scenario p1 create orders ', async () => {
    await manager()
    // console.log(global.JOURNAL)
    expect(global.JOURNAL.positionLimits.length).toEqual(4)
  });

  it('test Scenario p2 emulate too buys -> place multiposition', async () => {


    global.CCXT['notSafe'].fetchOrder = function(payload) {
      console.log('fetchOrderTest')
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
    await manager()
    // console.log(global.JOURNAL)
    expect(global.JOURNAL.positionLimits.length).toEqual(2)
    expect(global.JOURNAL.multipositionInfo.id).toEqual('test_sell_id')
    // expect(global.JOURNAL.filledLimits.length).toEqual(0)
    // expect(global.JOURNAL.multipositionSourseOrders.length).toEqual(2)
  });

  it('test Scenario p3 emulate sell of closing order', async () => {

    global.CCXT['notSafe'].fetchOrder = function(payload) {
      console.log('fetchOrderTest')
      var sellOrder = _.cloneDeep(global.JOURNAL.multipositionInfo)
      sellOrder.filled = sellOrder.amount
      sellOrder.status = 'filled'
      global.JOURNAL.multipositionInfo = sellOrder

      return sellOrder
    }
    await manager()
    console.log(global.JOURNAL)
    // expect(global.JOURNAL.filledLimits.length).toEqual(0)
    // expect(global.JOURNAL.souseOrders.length).toEqual(2)
  });
});
