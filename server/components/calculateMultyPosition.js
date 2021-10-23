const calculateMultyPosition = async function( positions ) {
  let sumOfTotals = 0
  let sumOfShares = 0

  for (let order of positions ) {
    sumOfTotals = sumOfTotals + (order.price * order.amount)
    sumOfShares = sumOfShares + order.amount
  }

  const weightedPrice = sumOfTotals / sumOfShares

  const result = { weightedPrice, sumOfShares }

  return result
}
exports.calculateMultyPosition = calculateMultyPosition
