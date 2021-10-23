const {roundPriceToLevel} = require('./roundPriceToLevel')

const startLevel = async function() {
  const marketPrice = global.ORDERBOOK['bids'][0][0]
  let startLevel
  if ( global.JOURNAL.maxLevel > marketPrice ) {
    startLevel = await roundPriceToLevel(marketPrice, global.JOURNAL.levelStep)
  } else {
    startLevel = await roundPriceToLevel(global.JOURNAL.maxLevel, global.JOURNAL.levelStep)
  }
  // console.log(startLevel)
  return startLevel
}
exports.startLevel = startLevel
