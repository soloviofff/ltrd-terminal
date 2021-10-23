const _ = require('lodash')

const findLocalLow = async function() {
  const candlesL = global.OHLCV.length
  return global.OHLCV[candlesL-1][3]
}
exports.findLocalLow = findLocalLow
