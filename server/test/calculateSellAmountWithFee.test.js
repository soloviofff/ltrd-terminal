const {calculateFeesAndRemainings} = require('../components/calculateFeesAndRemainings')

const percentDiff = function (small, big ){
  if (small === 0 || (big - small) === 0) return 0
  return (big - small) / small * 100
}

it('test calculateSellAmount', async () => {
  global.JOURNAL = {
    fee: {
      taker: 0.1,
      maker: 0.1
    },
    targetProfitPercent: 0.075
  }
  const buyPrice = 7501.05
  const buyAmount = 0.0016
  const result = await calculateFeesAndRemainings(buyPrice, buyAmount)

  const buyCost = buyPrice * buyAmount
  const sellCost = result.newAmount * result.targetPrice
  // console.log('buyCost', buyCost)
  // console.log('sellCost', sellCost)
  // console.log(result)
  // const result = await calculateFeesAndRemainings(7533.05, 0.001593 )
  const SC = sellCost * 0.1 / 100
  const percent = (sellCost - SC) / (buyCost / 100) - 100
  // const percent = percentDiff(buyCost, sellCost)
  // console.log('percent', percent)
  expect(result.fee).toBe(0.0000016000000000000001)
  expect(result.targetPrice).toBe(7521.7)
  expect(result.newAmount).toBe(0.0015984)
});
