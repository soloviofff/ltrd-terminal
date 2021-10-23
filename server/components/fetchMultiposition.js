const {fetchOrder} = require('./fetchOrder')
const {historyInsertNew} = require('./mongoActions')
const _ = require('lodash')


const completeMultiposition = async function(isTest = false) {
  let accountingItem = {}
  accountingItem.buy = global.JOURNAL.multipositionSourseOrders
  accountingItem.sell = global.JOURNAL.multipositionInfo
  if (!isTest) {
    await historyInsertNew(accountingItem)
  } else {
    console.log('completeMultiposition => avoiding mongo if it is test runing')
  }
  // console.log(accountingItem)
  global.JOURNAL.multipositionSourseOrders = []
  global.JOURNAL.multipositionInfo = {}
}

// const partialFilledSituation = async function (isTest = false) {
//   sellOrder = _.cloneDeep(global.JOURNAL.multipositionInfo.order)
//   buyOrders = _.cloneDeep(global.JOURNAL.multipositionSourseOrders)

//   const sortedBuyOrders = _.orderBy(buyOrders, 'price', 'asc')
//   console.log(sortedBuyOrders)


// }

const fetchMultiposition = async function (isTest = false) {
  const sellId = global.JOURNAL.multipositionInfo.order.id
  // fetch sell order
  const situation = await fetchOrder(sellId)
  global.JOURNAL.multipositionInfo.order = situation
  if (situation.filled === situation.amount) {
    // order is complitly filled => moving info to accounting collection
      // clearing multipositionInfo
      // clearing multipositionSourseOrders
    await completeMultiposition(isTest)
  }
  // else if (situation.filled !== 0) {
  //   // if sell.filled !== 0
  //   // order is touched by market
  //   // have partialFilled situation
  //   // check what of sourseOrders can be finished
  //   await partialFilledSituation(isTest)
  // }
}

exports.fetchMultiposition = fetchMultiposition
