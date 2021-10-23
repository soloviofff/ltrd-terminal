const _ = require('lodash')

const moveFilledLimits = async function() {
  const filledLimits = _.cloneDeep(global.JOURNAL.filledLimits)
  for (order of filledLimits) {
    global.JOURNAL.multipositionSourseOrders.push(order)
  }
  // global.JOURNAL.multipositionSourseOrders = filledLimits
  global.JOURNAL.filledLimits = []
}

exports.moveFilledLimits = moveFilledLimits
