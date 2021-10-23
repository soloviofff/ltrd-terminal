
const {calculateProfit} = require('../components/calculateProfit')

const {calculateMultyPosition} = require('../components/calculateMultyPosition')
const {calculateFeesAndRemainings} = require('../components/calculateFeesAndRemainings')



it('test calculateProfit', async () => {

  const result = await calculateProfit(12.0227 , 12.00168 , 0.1)
  expect(result.percentProfit).toBe(0.0749670046193529)
  expect(result.profit).toBe(0.008997300000000036)

});
it('test calculateMultiposition Profit', async () => {

  global.JOURNAL = {
    fee: {
      maker: 0.01
    },
    targetProfitPercent: 3
  }

  const positions = [
    {
      price: 9800,
      amount: 0.0035
    },
    {
      price: 9700,
      amount: 0.0037
    },
    {
      price: 9600,
      amount: 0.0041
    },
    {
      price: 9500,
      amount: 0.0045
    }
  ]


  let separate = 0

  for (let order of positions) {
    const singleSellPosition = await calculateFeesAndRemainings(order.price , order.amount) // price,amount
    // console.log(singleSellPosition)
    // result = {
    //   fee: calculatedFee,
    //   newAmount: recievedGoods,
    //   targetPrice: parseFloat(calculatedSellPrice.toFixed(2))
    // }

    const resultOfSinglePosition = await calculateProfit(singleSellPosition.newAmount * singleSellPosition.targetPrice, order.price * order.amount, global.JOURNAL.fee.maker) // costSell, costBuy, sellFee
    // console.log(resultOfSinglePosition)
    separate = separate + resultOfSinglePosition.profit
  }
  // console.log('separatetd profit', separate)
  const multiposition = await calculateMultyPosition(positions)
  // console.log('multiposition', multiposition)
  const multiSellPosition = await calculateFeesAndRemainings(multiposition.weightedPrice , multiposition.sumOfShares)
  // console.log('multiSellPosition', multiSellPosition)
  const resultOfMultiPosition = await calculateProfit( multiSellPosition.newAmount * multiSellPosition.targetPrice, multiposition.weightedPrice * multiposition.sumOfShares, global.JOURNAL.fee.maker)
  // console.log('multi profit', resultOfMultiPosition.profit)

  // expect(result.percentProfit).toBe(0.0749670046193529)
  expect(resultOfMultiPosition.profit).toBe(4.568941505003202)

});
