



const {getOHLCV} = require('./getOHLCV')
const {sleep} = require('./sleep')
const _ = require('lodash')

const {findLocalLow} = require('./findLocalLow')
const {generateLevels} = require('./generateLevels')

const {createOrder} = require('./createOrder')
const {cancelOrder} = require('./cancelOrder')
const {fetchOrder} = require('./fetchOrder')

const {calculateAmount} = require('./calculateAmount')
const {roundPriceToLevel} = require('./roundPriceToLevel')

// const {checkForHavePosition} = require('./checkForHavePosition')
// const {checkForPositionLimits} = require('./checkForPositionLimits')

const {removeLimitPosition} = require('./removeLimitPosition')
const {startLevel} = require('./startLevel')

// states chechers

const {haveActiveBuys} = require('./haveActiveBuys')
const {haveFilledLimits} = require('./haveFilledLimits')
const {haveSourseOrders} = require('./haveSourseOrders')
const {haveMultiposition} = require('./haveMultiposition')

const {calculateMultyPosition} = require('./calculateMultyPosition')
const {calculateFeesAndRemainings} = require('./calculateFeesAndRemainings')

const {createLimitsSteps} = require('./createLimitsSteps')
const {fetchLimitsSteps} = require('./fetchLimitsSteps')

const {moveFilledLimits} = require('./moveFilledLimits')

const {placeMultiposition} = require('./placeMultiposition')


const manager = async function() {
  // console.log('trade cycle algoritm', 'Testing:'+test, 'testCase:'+testCase )

  if ( haveSourseOrders() && haveMultiposition() ) {
    // fetch multiposition
    console.log('fetch multiposition')
    const sellOrder = _.cloneDeep(global.JOURNAL.multipositionInfo)
    const situation = await fetchOrder(sellOrder.id)
    if (situation.amount === situation.filled) {
      console.log('success SALE')
    }

    // for (let order of positionLimits) {
    //   await sleep(500)
    //   const situation = await fetchOrder(order.id)
    return
  }


  if (haveActiveBuys()) {
    console.log('not empty position')
    await fetchLimitsSteps()

    if ( haveFilledLimits() ) {
      console.log('have new filled limits')
      if ( !haveSourseOrders() && !haveMultiposition() ) {
        console.log('have active position')
        // check sell order
        // if alive & filled = 0
          // cancel -> generate new sell position

        // if alive & filled != 0
          // create partial sell log
          // cancel sell
          // generate new sell with fixes in amount

      } else {
        console.log('have new filled limits && DONT have active position')
        // generate multiposition
        await placeMultiposition()
      }

      return
    }

  }



  if (!haveActiveBuys()) {
    console.log('empty position')
    await createLimitsSteps()
    return
  }

}

exports.manager = manager
