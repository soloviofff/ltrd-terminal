// haveSourseOrders

const {haveFilledLimits} = require('../components/haveFilledLimits')

it('test not haveFilledLimits', async () => {
  global.JOURNAL = {
    filledLimits: []
  }
  const result = await haveFilledLimits()
  expect(result).toBe(false)
});

it('test haveFilledLimits', async () => {
  global.JOURNAL = {
    filledLimits: [
      {
        price: 1000,
        amount: 10
      }
    ]
  }
  const result = await haveFilledLimits()
  expect(result).toBe(true)
});
