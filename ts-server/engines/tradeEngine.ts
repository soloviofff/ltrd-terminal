import ccxt from 'ccxt'
import {sleep} from '../components/sleep'


interface Account{
  test: boolean
  broker: string
  key: string
  private_key: string
  rateLimit: number
}
interface Create_order {
  symbol: string
  side: string // 'buy' || 'sell'
  amount: number
  price: number
}
interface Get_ohlvc {
  symbol: string
  timeframe: string
}
interface Cancel_order {
  id: string
  symbol: string
}


export class Engine {
  api = null
  test = false
  rateLimit = null
  sleepUntil = null
  broker = null

  constructor(account: Account) {
    console.log(`${account.broker} init`)
    this.test = account.test
    this.rateLimit = account.rateLimit
    this.broker = account.broker
    if (account.key && account.private_key ) {
      this.api = new ccxt[account.broker]({
        'apiKey': account.key,
        'secret': account.private_key,
        'timeout': 30000,
        'enableRateLimit': true
      })
    }
  }

  get isTest() {
    return this.test
  }
  get getApi() {
    return this.api
  }



  async catchHead () {
    if (this.rateLimit === undefined) this.rateLimit = 500
    while (true) {
      if ( this.sleepUntil == undefined ) {
        this.sleepUntil = Date.now() + this.rateLimit + 100
        break
      } else if ( this.sleepUntil < new Date() ) {
        this.sleepUntil = Date.now() + this.rateLimit + 100
        break
      } else {
        await sleep(200)
      }
    }
  }

  async create_limit_order (data: Create_order) {
    // {
    //   symbol: 'BTC/USDT',
    //   side: 'buy', // sell,
    //   amount: 1,
    //   price: 1
    // }
    await this.catchHead()
    const order = await this.api.createOrder (data.symbol, 'limit', data.side, data.amount, data.price)
    // console.log (order)
    return order
  }
  async cancel_order(data: Cancel_order) {
    await this.catchHead()
    let result = await this.api.cancelOrder(data.id, data.symbol);
    return result
  }

  async get_orderbook(symbol: string) {
    await this.catchHead()
    return this.api.fetchOrderBook(symbol)
  }
  async get_ohlcv(data: Get_ohlvc) {
    await this.catchHead()
    return this.api.fetchOHLCV(data.symbol, data.timeframe)
  }

  async get_instruments () {
    let instruments = []
    await this.catchHead()
    let _instruments = await this.api.loadMarkets()
    // console.log(_instruments)

    for (let [key, value] of <any>Object.entries(_instruments)) {
      // console.log(value)
      instruments.push(value.symbol)
    }
    return instruments
  }

  async get_portfolio() {
    let _balance = []
    await this.catchHead()
    let balance = await this.api.fetchBalance()

    delete balance.info
    delete balance.free
    delete balance.used
    delete balance.total

    for (let [key, value] of <any>Object.entries(balance) ) {
      _balance.push({
        name: key,
        free: value.free,
        total: value.total,
        used: value.used
      })
    }
    return _balance
  }

  async get_user_orders(symbol: string) {
    await this.catchHead()
    let user_orders = await this.api.fetchOpenOrders(symbol)
    return user_orders
  }

  async get_user_orders_history (symbol: string) {
    await this.catchHead()
    let user_orders = await this.api.fetchMyTrades(symbol)
    return user_orders
  }

  async fetchOrder (id: string, symbol: string) {
    if (this.api.has['fetchOrder']) {
      await this.catchHead()
      const data = await this.api.fetchOrder(id, symbol)
      // console.log('fetchOrder')
      // console.log(data)
      return data
    } else {
      console.warn('Cant Fetch order', id, symbol)
    }
  }
}
