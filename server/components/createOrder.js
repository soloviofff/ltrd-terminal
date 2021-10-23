const {catchHead} = require('./catchHead')

const createOrder = async function(side, amount, price) {
  if (global.CCXT['notSafe'].has['createOrder']) {
    await catchHead(global.RateLimit, 'binance')
    const result = await global.CCXT['notSafe'].createOrder(global.JOURNAL.symbol, 'limit', side, amount, price)
    /// ('BTC/USD', 'limit', 'buy', 1, 2500.00)
    // console.log('createOrder', result.id)
    // console.log(result)
    return result
  }
}

exports.createOrder = createOrder
