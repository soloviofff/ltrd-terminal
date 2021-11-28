

export const calculateFeesAndRemainings = async (buyPrice, buyAmount, fee, targetProfitPercent) => {
  //  buyAmount количество(объем) покупки
  //  buyPrice цена покупки
  const C = fee.maker //  комиссия биржи за покупку / продажу по лимит ордерам
  const buyCost = buyPrice * buyAmount //  buyCost стоимость ордера на покупку
  const calculatedFee = buyAmount * C / 100 // комиссия биржи за покупку
  const recievedGoods = buyAmount - calculatedFee // сколько можем продать с учетом вычета комиссии
  const sellCost = buyCost * (1 + targetProfitPercent / 100) * (1 + C / 100) // какой должна быть итоговоя сумма сделки, чтобы получить желаемую прибыль
  const calculatedSellPrice = sellCost / recievedGoods
  const result = {
    fee: calculatedFee,
    amount: recievedGoods,
    price: parseFloat(calculatedSellPrice.toFixed(6))
  }
  // console.log(result)
  return result
}
