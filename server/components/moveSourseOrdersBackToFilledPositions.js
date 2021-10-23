const _ = require('lodash')

const moveSourseOrdersBackToFilledPositions = async function() {
  const sourseOrders = _.cloneDeep(global.JOURNAL.multipositionSourseOrders)
  for (let order of sourseOrders) {
    global.JOURNAL.filledLimits.push(order)
  }
  // global.JOURNAL.filledLimits = sourseOrders
  global.JOURNAL.multipositionSourseOrders = []
}

exports.moveSourseOrdersBackToFilledPositions = moveSourseOrdersBackToFilledPositions
