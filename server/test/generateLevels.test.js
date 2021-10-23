const {generateLevels} = require('../components/generateLevels')

it('test generateLevels', async () => {
  const result = await generateLevels(7300, 100, 5)
  expect(result).toEqual([7300, 7200, 7100, 7000, 6900])
});
