const getBalance = async function(coinFrom, coinTo) {
  const data = await global.CCXT['safe'].fetch_balance()
  const balance = {}
  balance[`${coinFrom}`] = data[`${coinFrom}`]
  balance[`${coinTo}`] = data[`${coinTo}`]

  // console.log(balance)
  return balance

}
exports.getBalance = getBalance
