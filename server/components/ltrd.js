const startMongo = require('./startMongo')
const {initPublic, initSafe, initNotSafe} = require('./initExchange')
const ccxt = require ('ccxt')
const {calculateProfit} = require('./calculateProfit')
const {calculateMultyPosition} = require('./calculateMultyPosition')
const {calculateFeesAndRemainings} = require('./calculateFeesAndRemainings')
const {sleep} = require('./sleep')
const {roundPriceToLevel} = require('./roundPriceToLevel')
const _ = require('lodash')




class Bot {
  constructor() {
    this.mongo = undefined
    this.engines = {
      public: undefined,
      safe: undefined,
      notSafe: undefined
    }
    this.balance = {}
    this.symbol = ''
    this.coinFrom = ''
    this.coinTo = ''
    this.balance = {}
    this.positions = {}
    this.pocket = 0
    this.targetProfitPercent = 0.1
    this.candles = undefined
    this.config = {}
    this.orders = undefined
  }

  async init(config) {
    console.log('Init bot')
    // console.log( config.botParams.symbol.slice('/') )
    this.symbol = config.botParams.symbol
    this.coinFrom = config.botParams.symbol.split('/')[0]
    this.coinTo = config.botParams.symbol.split('/')[1]
    // console.log(this.coinFrom, this.coinTo)



    this.mongo = await startMongo(config.mongo)
    this.engines.public = new ccxt[config.botParams.stock] ({
      'enableRateLimit': true
    })
    this.engines.safe = new ccxt[config.botParams.stock] ({
      'enableRateLimit': true,
      'apiKey': config.user.safe.key,
      'secret': config.user.safe.secret
    })
    this.engines.notSafe = new ccxt[config.botParams.stock] ({
      'enableRateLimit': true,
      'apiKey': config.user.notSafe.key,
      'secret': config.user.notSafe.secret
    })

    // TODO GET MONGO data

    const options = await this.mongoReadOptions(config.botParams.symbol, config.botParams.stock)
    console.log(options)
    this.pocket = options.data.pocket
    this.targetProfitPercent = options.data.targetProfitPercent
    this.lot = options.data.lot
    this.maxLevel = options.data.maxLevel

    const positions = await this.mongoRead(config.botParams.symbol, config.botParams.stock)
    this.positions = positions.data
    console.log(this.positions)


    this.cycle()
  }

  async cycle() {
    while (true) {
      try {
        await this.get_balance()
        console.log(this.balance)
        await this.fetch_orders()
        console.log( this.orders.asks[0][0], await roundPriceToLevel(this.orders.asks[0][0], 100) )
        await this.manager()

      } catch(err){
        console.log(err)
      }
      await sleep(30*1000)
    }
  }

  async manager() {
    // if !positions => create positions
    if ( _.isEmpty(this.positions) ) {
      console.log('no positions')
      // define start level
      // generate levels
      // create orders -> save its data
    } else {
      // else => collect and analize data
      console.log('we have some positions')
      // check orders stuses
        // if status filled - mark as finished/ save data
        // change counter for positions
        // if have new buy -> generate new combined sell




    }




  }



  // STOCK ACTIONS
  async get_balance() {
    // console.log(this.engines.safe)
    await sleep(300)
    const data = await this.engines.safe.fetch_balance()
    this.balance[`${this.coinFrom}`] = data[`${this.coinFrom}`]
    this.balance[`${this.coinTo}`] = data[`${this.coinTo}`]
  }

  async fetch_orders() {
    await sleep(300)
    this.orders = await this.engines.safe.fetchOrderBook(this.symbol)
  }

  async create_order(side, amount, price) {
    return await this.engines.notSafe.createOrder(this.symbol, 'limit', side, amount, price)
    /// ('BTC/USD', 'limit', 'buy', 1, 2500.00)
  }

  async cancel_order(id) {
    return await this.engines.notSafe.cancelOrder(id, this.symbol)
  }

  async fetch_trades() {
    return await this.engines.notSafe.fetchMyTrades(this.symbol)
  }
  // STOCK ACTIONS END

  // MONGO

  async mongoUpdate(instrument, stock, data) {
    await global.MONGO.collection('positions').replaceOne({'instrument': instrument, 'stock': stock}, data, {upsert: true})
  }
  async mongoRead(instrument, stock) {
    return await this.mongo.collection('positions').findOne({'instrument': instrument, 'stock': stock})
  }
  async mongoReadOptions(instrument, stock) {
    return await this.mongo.collection('options').findOne({'instrument': instrument, 'stock': stock})
  }
  async historyRead(instrument, stock) {
    return await global.MONGO.collection('btbd_history').findOne({'instrument': instrument, 'stock': stock})
  }
  async historyUpdate(instrument, stock, data) {
    await global.MONGO.collection('btbd_history').replaceOne({'instrument': instrument, 'stock': stock}, data, {upsert: true})
  }

  // MONGO END
}
const bot = new Bot()
exports.default = bot
