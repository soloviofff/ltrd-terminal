const {startLevel} = require('../components/startLevel')

global.JOURNAL = {
  maxLevel: 600,
  levelStep: 100
}
global.ORDERBOOK = {
  bids: [
    [480, 400]
  ]
}
it('test startLevel', async () => {
  const result = await startLevel()
  expect(result).toBe(400)
});
