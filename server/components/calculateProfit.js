const calculateProfit = async function(costSell, costBuy, sellFee ) {
  const SC = costSell * sellFee / 100 // комиссия за продажу
  const profit = costSell - costBuy - SC // прибыль за сделку
  const percentProfit = (costSell - SC) / (costBuy / 100) - 100 // процент прибыли за сделку
  const result = {
    profit,
    percentProfit
  }
  return result
}
exports.calculateProfit = calculateProfit
