
/**
 * Любой объект кодержащий объем и цену
 */
export interface position {
    [key: string]: any
    amount: number
    price: number
}

/** Your class description */
export default class CalculationHelper {

    /** Your class description */
    public static roundNumber() {}
    public static calculateAmount(lot, price) {
        const amount = (lot/price).toFixed(6)
        return parseFloat(amount)
    }
    
    
    /**
     * Your class description
     *
     */
    public static calculateMultyPosition ( positions: position[] ): position {
        let sumOfTotals = 0
        let sumOfShares = 0

        positions.forEach(order => {
            sumOfTotals = sumOfTotals + (order.price * order.amount)
            sumOfShares = sumOfShares + order.amount
        })

        return { price: sumOfTotals / sumOfShares, amount: sumOfShares }
    }
    
    public static generateLevels (maxLevel, step, numberOfSteps) {
        const levels = [maxLevel]
        let currentLevel = maxLevel
        const times = numberOfSteps - 1
        for(let i=0; i < times; i++){
            currentLevel = currentLevel - step
            levels.push(currentLevel)
        }
        // console.log(levels)
        return levels
    }
    
    /**
     * Your class description
     * */
    public static calculateFeesAndRemainings (buyPrice, buyAmount, fee, targetProfitPercent) {
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
    
    public static roundPriceToLevel (value, level ) {
        return level * Math.floor(value / level)
    }
    
    public static startLevel ( orderbook, maxLevel, levelStep) {
        const marketPrice = orderbook['bids'][0][0]
        let startLevel
        if ( maxLevel > marketPrice ) {
            startLevel = this.roundPriceToLevel(marketPrice, levelStep)
        } else {
            startLevel = this.roundPriceToLevel(maxLevel, levelStep)
        }
        // console.log(startLevel)
        return startLevel
    }
    
    public static getBestBid () {}
    public static getBestSatisfyBid(){}
    public static getBestAsk () {}
    public static getBestSatisfyAsk(){}

    public static percentageDifference(price1, price2) {
        const difference = price2 - price1;
        const percentageDifference = (difference / price1) * 100;
        return percentageDifference;
    }
    public static calculateExit (position: position, marketPrice: number) {
        
        if (position.price <= marketPrice) {
            return 0
        }
        
        let escapeAmount = position.amount
        let escapePrice = 0

        while ( true ) {
            const diff = this.percentageDifference(escapePrice, marketPrice)
            if (diff < 1) {
                break
            }
            const positions = [
                position,
                {
                    price: marketPrice,
                    amount: escapeAmount
                }
            ]
            const result = this.calculateMultyPosition(positions)
            escapePrice = result.price
            escapeAmount += 0.001
        }
        
        
        return escapeAmount
        
    }
}
