// haveActiveBuys
const {haveActiveBuys} = require('../components/haveActiveBuys')

it('test not haveActiveBuys', async () => {
  global.JOURNAL = {
    positionLimits: []
  }
  const result = await haveActiveBuys()
  expect(result).toBe(false)
});

it('test haveActiveBuys', async () => {
  global.JOURNAL = {
    positionLimits: [
      {
        price: 1000,
        amount: 10
      }
    ]
  }
  const result = await haveActiveBuys()
  expect(result).toBe(true)
});
