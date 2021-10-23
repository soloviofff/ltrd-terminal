
const {moveSourseOrdersBackToFilledPositions} = require('./moveSourseOrdersBackToFilledPositions')
const {cancelOrder} = require('./cancelOrder')


const removeMultiposition = async function() {
  const sellId = global.JOURNAL.multipositionInfo.order.id
  // console.log(sellId)
  if (sellId) {
    await cancelOrder(sellId)
    await moveSourseOrdersBackToFilledPositions()
    global.JOURNAL.multipositionInfo = {}
  }
}

exports.removeMultiposition = removeMultiposition
