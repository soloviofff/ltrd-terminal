const {roundPriceToLevel} = require('../components/roundPriceToLevel')


it('test roundPriceToLevel', async () => {
  const result = await roundPriceToLevel(7312.01, 100)
  expect(result).toBe(7300)
});
