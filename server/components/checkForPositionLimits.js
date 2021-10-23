const _ = require('lodash')
const {sleep} = require('./sleep')
const {fetchOrder} = require('./fetchOrder')
const {createOrder} = require('./createOrder')
const {cancelOrder} = require('./cancelOrder')
const {findLocalLow} = require('./findLocalLow')
const {generateLevels} = require('./generateLevels')
const {calculateAmount} = require('./calculateAmount')

const {removeLimitPosition} = require('./removeLimitPosition')
const {startLevel} = require('./startLevel')

const checkForPositionLimits = async function() {
  if ( _.isEmpty(global.JOURNAL.positionLimits) ) {
    console.log('empty position')
    const startLevel = await startLevel()
    const levels = await generateLevels(startLevel, global.JOURNAL.levelStep, Math.floor(global.JOURNAL.pocket / global.JOURNAL.lot) )
    console.log(levels)

    for (let level of levels ) {
      await sleep(330)
      const amount = await calculateAmount(global.JOURNAL.lot, level)
      const order = await createOrder('buy', amount, level)
      console.log(order)
      global.JOURNAL.positionLimits.push(order)
    }
  } else {
    // если присутсвует лесенка
    console.log('not empty position')
    for (let order of global.JOURNAL.positionLimits) {
      // console.log(order)
      // проверяем все ордера
      await sleep(500)
      const situation = await fetchOrder(order.id)
      if (situation.filled === situation.amount) {
        // if status status: 'open',
        console.log(order.id, situation.status, order.price)
        global.JOURNAL.multipositionSourseOrders.push(situation)
        await removeLimitPosition(situation)

        global.JOURNAL.positionLimitsTimestamp = situation.timestamp
      }
    }

    if ( !_.isEmpty(global.JOURNAL.multipositionSourseOrders) ) {
      // есть закупки
      console.log('multipositionSourseOrders')
      if ( ( !Object.keys(global.JOURNAL.multipositionInfo).length == 0 ) && global.JOURNAL.multipositionCounter !== global.JOURNAL.multipositionSourseOrders.length ) {
        console.log('multipositionCounter')
        // если счеткик мультипозиции не равен, количеству ордеров источников
        // проверяем ордер закрытия
        const multipositionSituation = await fetchOrder(global.JOURNAL.multipositionInfo.id)
        if (multipositionSituation.status !== 'open' ) {
          // ордер не исполнен > отменяем его > создаем новый
        } else if (situation.status !== 'filled' ) {
          // ордер исполен - занести в бухгалтерию

        }
      }
    }

    // NO FISH IN NET check timedelta
    if ( ( global.JOURNAL.multipositionSourseOrders.length === 0 )  && (global.JOURNAL.positionLimits.length > 0) ) {
      console.log('NO FISH IN NET check timedelta')
      const now = Date.now()
      const deltaTime = now - global.JOURNAL.positionLimitsTimestamp
      if (deltaTime > global.JOURNAL.timedelta) {
        console.log('timedelta is BIG, removing limits')
        for (let position of global.JOURNAL.positionLimits) {
          await sleep(330)
          console.log(`need to remove position ${position.id}`)
          await cancelOrder(position.id)
          await removeLimitPosition(position)
        }
      } else {
        console.log('timedelta is NOT BIG, holding limits')
      }
    }
  }

}
exports.checkForPositionLimits = checkForPositionLimits
