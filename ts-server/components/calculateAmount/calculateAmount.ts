export const calculateAmount = async (lot, price) => {
  const amount = (lot/price).toFixed(6)
  return parseFloat(amount)
}
