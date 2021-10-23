const _ = require('lodash')
const {sleep} = require('./sleep')
const {fetchOrder} = require('./fetchOrder')
const {removeLimitPosition} = require('./removeLimitPosition')

const fetchLimitsSteps = async function () {
  const positionLimits = _.cloneDeep(global.JOURNAL.positionLimits)
  for (let order of positionLimits) {
    const situation = await fetchOrder(order.id)
    if (situation.filled === situation.amount) {
      await removeLimitPosition(situation)
      global.JOURNAL.filledLimits.push(situation)
    }
  }
}

exports.fetchLimitsSteps = fetchLimitsSteps
