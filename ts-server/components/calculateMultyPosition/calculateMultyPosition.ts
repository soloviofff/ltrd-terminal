

export const calculateMultyPosition = async ( positions ) => {
  let sumOfTotals = 0
  let sumOfShares = 0

  positions.forEach(order => {
    sumOfTotals = sumOfTotals + (order.price * order.amount)
    sumOfShares = sumOfShares + order.amount
  })

  const result = { price: sumOfTotals / sumOfShares, amount: sumOfShares }

  return result
}
