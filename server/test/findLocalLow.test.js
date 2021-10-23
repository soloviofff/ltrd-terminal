const {findLocalLow} = require('../components/findLocalLow')


it('test findLocalLow', async () => {

  global.OHLCV = [
    [ 1575203400000, 7335.4, 7368.27, 7334.53, 7365, 524.116207 ],
    [ 1575204300000, 930, 1200, 1000, 930, 392.27885 ],
    [ 1575205300000, 930, 1200, 900, 930, 392.27885 ]
  ]
  const result = await findLocalLow()
  expect(result).toBe(900)
});
