const {sleep} = require('./sleep')
const {catchHead} = require('./catchHead')
const fetchOrderbookCycle = async function() {
  while (true) {
    await fetchOrderbook()
    await sleep(1000*30)
  }
}

const fetchOrderbook = async function() {
  await catchHead(global.RateLimit, 'binance')
  global.ORDERBOOK = await global.CCXT['public'].fetchOrderBook(global.JOURNAL.symbol)
  console.log('fetchOrderbook')
  // console.log(global.ORDERBOOK)
}
exports.fetchOrderbookCycle = fetchOrderbookCycle
