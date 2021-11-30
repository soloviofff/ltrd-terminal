
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

import _ from 'lodash'

import {startLevel} from '../components/startLevel/startLevel'
import {generateLevels} from '../components/generateLevels/generateLevels'
import {calculateAmount} from '../components/calculateAmount/calculateAmount'
import {calculateMultyPosition} from '../components/calculateMultyPosition/calculateMultyPosition'
import {calculateFeesAndRemainings} from '../components/calculateFeesAndRemainings/calculateFeesAndRemainings'

export class Ltrd {
  api = null
  symbol = null
  maxLevel = null
  levelStep = null
  lot = null
  pocket = null
  targetProfitPercent = null
  fee = null

  positionLimits = []


  // TODO: switch to db state
  multipositionInfo = {}
  multipositionSourseOrders = []
  filledLimits = []
  weighetInfo = {}
  candles = []
  orderbook = {}

  constructor (config: Config) {
    this.api = config.api
    this.symbol = config.symbol
    this.positionLimits = config.positionLimits
    this.maxLevel = config.maxLevel
    this.levelStep = config.levelStep
    this.targetProfitPercent = config.targetProfitPercent
    this.lot = config.lot
    this.fee = config.fee
    this.pocket = config.pocket
    this.multipositionSourseOrders = config.multipositionSourseOrders
    this.multipositionInfo = config.multipositionInfo
    this.filledLimits = config.filledLimits
    this.weighetInfo = config.weighetInfo
  }

  init() {

  }


  async manager() {
    // console.log('trade cycle algoritm', 'Testing:'+test, 'testCase:'+testCase )

    if ( this.haveSourseOrders && this.haveMultiposition ) {
      // fetch multiposition
      console.log('fetch multiposition')
      const sellOrder = _.cloneDeep(this.multipositionInfo)
      const situation = await this.api.fetchOrder(sellOrder.id)
      if (situation.amount === situation.filled) {
        console.log('success SALE')
      }

      // for (let order of positionLimits) {
      //   await sleep(500)
      //   const situation = await fetchOrder(order.id)
      return
    }


    if (this.haveActiveBuys) {
      console.log('not empty position')
      await fetchLimitsSteps()

      if ( haveFilledLimits() ) {
        console.log('have new filled limits')
        if ( !haveSourseOrders() && !haveMultiposition() ) {
          console.log('have active position')
          // check sell order
          // if alive & filled = 0
            // cancel -> generate new sell position

          // if alive & filled != 0
            // create partial sell log
            // cancel sell
            // generate new sell with fixes in amount

        } else {
          console.log('have new filled limits && DONT have active position')
          // generate multiposition
          await placeMultiposition()
        }

        return
      }

    }



    if (!this.haveActiveBuys) {
      console.log('empty position')
      await this.createLimitsSteps()
      return
    }

  }

  get haveSourseOrders () {
    if ( this.multipositionSourseOrders.length > 0 ) {
      return true
    } else {
      return false
    }
  }
  get haveMultiposition() {
    if ( !_.isEmpty(this.multipositionInfo) ) {
      return true
    } else {
      return false
    }
  }
  get haveActiveBuys () {
    if ( this.positionLimits.length > 0 ) {
      return true
    } else {
      return false
    }
  }





  async createLimitsSteps () {
    const level = await startLevel(this.orderbook, this.maxLevel, this.levelStep)
    const levels = await generateLevels(level, this.levelStep, Math.floor(this.pocket / this.lot) )
    for (let level of levels ) {
      const amount = await calculateAmount(this.lot, level)
      const order = await this.api.create_limit_order('buy', amount, level)
      this.positionLimits.push(order)
      // global.JOURNAL.positionLimitsTimestamp = order.timestamp
    }
  }

  async removeLimitPosition (payload) {
    const positionLimits = _.cloneDeep(this.positionLimits)
    const index = positionLimits.findIndex(item => item.id === payload.id);
    if (index !== -1) {
      // console.log('REMOVING JOURNAL limit position', payload.id, index)
      positionLimits.splice(index, 1)
    }
    this.positionLimits = positionLimits
  }


  async placeMultiposition() {
    const weighetInfo = await calculateMultyPosition(this.filledLimits)
    // console.log(weighetInfo)
    const multiSellPosition = await calculateFeesAndRemainings(weighetInfo.price , weighetInfo.amount, this.fee, this.targetProfitPercent)
    // console.log(multiSellPosition)
    await this.moveFilledLimits()
    // move filledLimits -> sourseOrders
    this.weighetInfo = weighetInfo
    this.multipositionInfo.weighetInfo = weighetInfo
    this.multipositionInfo.multiSellPosition = multiSellPosition
    this.multipositionInfo.order = await this.api.createOrder('sell', multiSellPosition.amount, multiSellPosition.price )
  }

  async fetchLimitsSteps () {
    const positionLimits = _.cloneDeep(this.positionLimits)
    for (let order of positionLimits) {
      const situation = await this.api.fetchOrder(order.id)
      if (situation.filled === situation.amount) {
        await this.removeLimitPosition(situation)
        this.filledLimits.push(situation)
      }
    }
  }

  async moveFilledLimits() {
    const filledLimits = _.cloneDeep(this.filledLimits)
    for (let order of filledLimits) {
      this.multipositionSourseOrders.push(order)
    }
    this.filledLimits = []
  }

}
