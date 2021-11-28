import {roundPriceToLevel} from '../roundPriceToLevel/roundPriceToLevel'

export const startLevel = async ( orderbook, maxLevel, levelStep) => {
  const marketPrice = orderbook['bids'][0][0]
  let startLevel
  if ( maxLevel > marketPrice ) {
    startLevel = await roundPriceToLevel(marketPrice, levelStep)
  } else {
    startLevel = await roundPriceToLevel(maxLevel, levelStep)
  }
  // console.log(startLevel)
  return startLevel
}
