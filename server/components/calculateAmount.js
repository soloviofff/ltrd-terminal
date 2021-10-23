
const calculateAmount = async function(lot, price) {
  const amount = (lot/price).toFixed(6)
  return parseFloat(amount)
}
exports.calculateAmount = calculateAmount
