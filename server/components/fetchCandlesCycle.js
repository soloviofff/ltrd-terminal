const {sleep} = require('./sleep')
const {catchHead} = require('./catchHead')

const fetchCandlesCycle = async function() {
  while (true) {
    await fetchCandles()
    await sleep(1000*30)
  }
}

const fetchCandles = async function() {
  let result
  // global.OHLCV = await getOrderbook(global.JOURNAL.instrument)

  await catchHead(global.RateLimit, 'binance')
  if (global.CCXT['public'].has.fetchOHLCV) {
    global.OHLCV = await global.CCXT['public'].fetchOHLCV(global.JOURNAL.symbol, '1h')
    console.log('fetchCandles')
    // console.log(global.OHLCV)
  } else {
    console.log('stock DONT support OHLCV data')
  }
}

exports.fetchCandlesCycle = fetchCandlesCycle
