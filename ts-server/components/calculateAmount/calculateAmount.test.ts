import {calculateAmount} from './calculateAmount'


it('test calculateAmount', async () => {

  const result = await calculateAmount(10, 7312.01)
  expect(result).toBe(0.001368)
});
