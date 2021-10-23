const _ = require('lodash')
const {sleep} = require('./sleep')
const {fetchOrder} = require('./fetchOrder')

const checkForHavePosition = async function() {
  if ( !_.isEmpty(global.JOURNAL.multipositionSourseOrders) ) {
    console.log('have position')
    // если есть ордера в списке на закрытие позиции, то спева надо проверить что с ними
    if ( !_.isEmpty(global.JOURNAL.multipositionInfo) ) {
      await sleep(500)
      const multipositionSituation = await fetchOrder(global.JOURNAL.multipositionInfo.id)
      if (multipositionSituation.status !== 'open' ) {
        // ордер не исполнен
      } else if (situation.status !== 'filled' ) {
        // ордер исполен - занести в бухгалтерию
      }
    }
  }
}

exports.checkForHavePosition = checkForHavePosition
