const express = require('express')
const app = express()
const api = require('./api/api')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

var port = '127.0.0.1'
app.listen(8000, port, () => {
  console.log('Extractor server launched on 8000 port')
})

app.use('/ltrd-api', api)


const startMongo = require('./components/startMongo')
const ccxt = require ('ccxt')
const {initPublic, initSafe, initNotSafe} = require('./components/initExchange')

const {fetchOrderbookCycle} = require('./components/fetchOrderbookCycle')
const {fetchCandlesCycle} = require('./components/fetchCandlesCycle')
// const {fetchJournalCycle} = require('./components/fetchJournalCycle')
const {fetchBalanceCylce} = require('./components/fetchBalanceCylce')
const {fetchLimitsCycle} = require('./components/fetchLimitsCycle')
const {fetchMultipositionCycle} = require('./components/fetchMultipositionCycle')
const {initJournal} = require('./components/initJournal')
const {fetchAccountingCycle} = require('./components/fetchAccountingCycle')

global.CCXT = {}
global.sleepUntil = {}
global.RateLimit = 1000

global.MONGO
global.JOURNAL = {
  stock: '',
  symbol: 'BTC/USDT',
  coinFrom: '',
  coinTo: '',
  lot: 12,
  pocket: 300,
  timedelta: 50000,
  targetProfitPercent: 0,
  maxLevel: 0,
  levelStep: 0,
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
  multipositionInfo: {},
  weighetInfo: {}
}
global.CCXT = {}
global.OPTIONS = {}
global.TRADES_HISTORY = {}
global.sleepUntil = {}
global.OHLCV = []
global.ORDERBOOK = {}
global.ACCOUNTING = []


const config = require('../private/config').default
const options = require('./options').default

const main = async () => {
  global.OPTIONS = options
  // console.log(global.OPTIONS)
  try { global.MONGO = await startMongo(config.mongo) } catch(err) { console.log(err) }

  try {
    await initPublic(global.OPTIONS.stock)
    await initSafe(config.user.safe.key, config.user.safe.secret, global.OPTIONS.stock)
    await initNotSafe(config.user.notSafe.key, config.user.notSafe.secret, global.OPTIONS.stock)
    await initJournal()
    // console.log(global.CCXT['safe'])
    // tasksCycle()

    fetchOrderbookCycle()
    fetchCandlesCycle()
    fetchBalanceCylce()
    // fetchJournalCycle()
    fetchLimitsCycle()
    fetchAccountingCycle()
    fetchMultipositionCycle()



  } catch(err){
    console.log(err)
  }

}
main()
