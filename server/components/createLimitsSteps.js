const {startLevel} = require('./startLevel')
const {generateLevels} = require('./generateLevels')
const {calculateAmount} = require('./calculateAmount')
const {createOrder} = require('./createOrder')
// const {sleep} = require('./sleep')

const createLimitsSteps = async function () {
  const level = await startLevel()
  const levels = await generateLevels(level, global.JOURNAL.levelStep, Math.floor(global.JOURNAL.pocket / global.JOURNAL.lot) )
  for (let level of levels ) {
    const amount = await calculateAmount(global.JOURNAL.lot, level)
    const order = await createOrder('buy', amount, level)
    global.JOURNAL.positionLimits.push(order)
    // global.JOURNAL.positionLimitsTimestamp = order.timestamp
  }
}

exports.createLimitsSteps = createLimitsSteps
