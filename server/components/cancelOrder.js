const {catchHead} = require('./catchHead')

const cancelOrder = async function(id) {
  if (global.CCXT['notSafe'].has['cancelOrder']) {
    await catchHead(global.RateLimit, 'binance')
    const result = await global.CCXT['notSafe'].cancelOrder(id, global.JOURNAL.symbol)
    // console.log('cancelOrder', result.id)
    // console.log(result)
    return result
  }
}
exports.cancelOrder = cancelOrder
