
const getOHLCV = async function(instrument) {
  const result
  // global.OHLCV = await getOrderbook(global.JOURNAL.instrument)
  if (global.CCXT['public'].has.fetchOHLCV) {
    result = await global.CCXT['public'].fetchOHLCV(instrument, '1w')
    // console.log(result)
  } else {
    console.log('stock DONT support OHLCV data')
  }

  return result
}

exports.getOHLCV = getOHLCV
