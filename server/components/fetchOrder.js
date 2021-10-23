const {catchHead} = require('./catchHead')

const fetchOrder = async function(id) {
  // fetchOrder
  if (global.CCXT['notSafe'].has['fetchOrder']) {
  	await catchHead(global.RateLimit, 'binance')
    const data = await global.CCXT['notSafe'].fetchOrder(id, global.JOURNAL.symbol)
    // console.log('fetchOrder')
    // console.log(data)
    return data
  } else {
    console.warn('Cant Fetch order', id, global.JOURNAL.symbol)
  }

}
exports.fetchOrder = fetchOrder
