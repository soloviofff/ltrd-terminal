const {sleep} = require('./sleep')
const {catchHead} = require('./catchHead')
const {getBalance} = require('./getBalance')
const {mongoUpdate} = require('./mongoActions')

const fetchBalanceCylce = async function() {
  while (true) {
    await catchHead(global.RateLimit, 'binance')
    console.log('fetchBalance')
    const balance = await getBalance(global.JOURNAL.coinFrom, global.JOURNAL.coinTo)
    global.JOURNAL.balance = balance
    await mongoUpdate(global.JOURNAL.symbol, global.JOURNAL.stock, global.JOURNAL)
    await sleep(1000*60)
  }

}

exports.fetchBalanceCylce = fetchBalanceCylce
