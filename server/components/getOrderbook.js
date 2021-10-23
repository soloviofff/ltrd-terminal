

const getOrderbook = async function(symbol) {

  const data = await global.CCXT['public'].fetchOrderBook(symbol)
  // console.log(data)
  return data
}
exports.getOrderbook = getOrderbook
