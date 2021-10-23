const _ = require('lodash')
const {sleep} = require('./sleep')
const {catchHead} = require('./catchHead')
const {mongoUpdate} = require('./mongoActions')
const {removeLimitPosition} = require('./removeLimitPosition')
const {haveActiveBuys} = require('./haveActiveBuys')
const {fetchOrder} = require('./fetchOrder')

const fetchLimitsCycle = async function() {
  while(true) {
    if (haveActiveBuys()) {
      console.log('fetchLimits')
      const positionLimits = _.cloneDeep(global.JOURNAL.positionLimits)
      for (let order of positionLimits) {
        await catchHead(global.RateLimit, 'binance')
        const situation = await fetchOrder(order.id)
        if (situation.filled === situation.amount) {
          await removeLimitPosition(situation)
          global.JOURNAL.filledLimits.push(situation)
          await mongoUpdate(global.JOURNAL.symbol, global.JOURNAL.stock, global.JOURNAL)
        }
      }
    }
    await sleep(1000*60)
  }
}

exports.fetchLimitsCycle = fetchLimitsCycle
