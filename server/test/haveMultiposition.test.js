// haveMultiposition

const {haveMultiposition} = require('../components/haveMultiposition')

it('test not haveMultiposition', async () => {
  global.JOURNAL = {
    multipositionInfo: {}
  }
  const result = await haveMultiposition()
  expect(result).toBe(false)
});

it('test haveMultiposition', async () => {
  global.JOURNAL = {
    multipositionInfo: {
      price: 1000,
      amount: 10
    }
  }
  const result = await haveMultiposition()
  expect(result).toBe(true)
});
