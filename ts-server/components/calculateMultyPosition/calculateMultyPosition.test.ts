import {calculateMultyPosition} from './calculateMultyPosition'

const positions = [
  {
    price: 100,
    amount: 1
  },
  {
    price: 120,
    amount: 2
  },
  {
    price: 80,
    amount: 2
  },
  {
    price: 60,
    amount: 3
  }
]

it('test calculateMultyPosition', async () => {

  const result = await calculateMultyPosition(positions)
  expect(result.price).toBe(85)
  expect(result.amount).toBe(8)
});
