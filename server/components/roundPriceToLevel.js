


const roundPriceToLevel = async function(value, level ) {
  return level * Math.floor(value / level)
}
exports.roundPriceToLevel = roundPriceToLevel
