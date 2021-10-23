const {calculateMultyPosition} = require('./calculateMultyPosition')
const {calculateFeesAndRemainings} = require('./calculateFeesAndRemainings')
const {moveFilledLimits} = require('./moveFilledLimits')
const {createOrder} = require('./createOrder')
const {sleep} = require('./sleep')

const placeMultiposition = async function() {
  const weighetInfo = await calculateMultyPosition(global.JOURNAL.filledLimits)
  // console.log(weighetInfo)
  const multiSellPosition = await calculateFeesAndRemainings(weighetInfo.weightedPrice , weighetInfo.sumOfShares)
  // console.log(multiSellPosition)
  await moveFilledLimits()
  // move filledLimits -> sourseOrders
  global.JOURNAL.weighetInfo = weighetInfo
  global.JOURNAL.multipositionInfo.weighetInfo = weighetInfo
  global.JOURNAL.multipositionInfo.multiSellPosition = multiSellPosition
  global.JOURNAL.multipositionInfo.order = await createOrder('sell', multiSellPosition.newAmount, multiSellPosition.targetPrice )
  // createOrder = async function(side, amount, price)
}

exports.placeMultiposition = placeMultiposition
