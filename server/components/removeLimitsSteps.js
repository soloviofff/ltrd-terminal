const {cancelOrder} = require('./cancelOrder')
const {sleep} = require('./sleep')
const {removeLimitPosition} = require('./removeLimitPosition')
const {mongoUpdate} = require('../components/mongoActions')

const removeLimitsSteps = async function() {

  for (let position of global.JOURNAL.positionLimits ) {
    await cancelOrder(position.id)
    await removeLimitPosition(position)
    await mongoUpdate(global.JOURNAL.symbol, global.JOURNAL.stock, global.JOURNAL)
  }
}
exports.removeLimitsSteps = removeLimitsSteps
