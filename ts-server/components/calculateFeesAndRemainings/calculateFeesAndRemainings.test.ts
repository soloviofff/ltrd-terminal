import {calculateFeesAndRemainings} from './calculateFeesAndRemainings'


const fee =  {
  taker: 0.1,
  maker: 0.1
}
const targetProfitPercent = 0.1
const buyPrice = 7500
const buyAmount = 0.1

it('test calculateSellAmount', async () => {
  const result = await calculateFeesAndRemainings(buyPrice, buyAmount, fee, targetProfitPercent)

  expect(result.fee).toBe(0.00010000000000000002)
  expect(result.price).toBe(7522.53003)
  expect(result.amount).toBe(0.0999)
});
