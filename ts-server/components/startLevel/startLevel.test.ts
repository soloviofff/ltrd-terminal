import {startLevel} from './startLevel'


const maxLevel =  600
const levelStep = 100
const orderbook = {
  bids: [
    [480, 400]
  ]
}
it('test startLevel', async () => {
  const result = await startLevel(orderbook, maxLevel, levelStep)
  expect(result).toBe(400)
});
