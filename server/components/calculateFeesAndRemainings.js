
const calculateFeesAndRemainings = async function(buyPrice, buyAmount) {
  //  buyAmount количество(объем) покупки
  //  buyPrice цена покупки
  const C = global.JOURNAL.fee.maker //  комиссия биржи за покупку / продажу по лимит ордерам
  const buyCost = buyPrice * buyAmount //  buyCost стоимость ордера на покупку
  const calculatedFee = buyAmount * C / 100 // комиссия биржи за покупку
  const recievedGoods = buyAmount - calculatedFee // сколько можем продать с учетом вычета комиссии
  // const goodsAfterSell = recievedGoods - (recievedGoods * C / 100) // сколько продадим с вычетом комиссии на продажу
  const sellCost = buyCost * (1 + global.JOURNAL.targetProfitPercent / 100) * (1 + C / 100) // какой должна быть итоговоя сумма сделки, чтобы получить желаемую прибыль
  const calculatedSellPrice = sellCost / recievedGoods
  const result = {
    fee: calculatedFee,
    newAmount: recievedGoods,
    targetPrice: parseFloat(calculatedSellPrice.toFixed(2))
  }
  // console.log(result)
  return result
}

exports.calculateFeesAndRemainings = calculateFeesAndRemainings
