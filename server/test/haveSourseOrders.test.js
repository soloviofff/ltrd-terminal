// haveSourseOrders

const {haveSourseOrders} = require('../components/haveSourseOrders')

it('test not haveSourseOrders', async () => {
  global.JOURNAL = {
    multipositionSourseOrders: []
  }
  const result = await haveSourseOrders()
  expect(result).toBe(false)
});

it('test haveSourseOrders', async () => {
  global.JOURNAL = {
    multipositionSourseOrders: [
      {
        price: 1000,
        amount: 10
      }
    ]
  }
  const result = await haveSourseOrders()
  expect(result).toBe(true)
});
