
export const roundPriceToLevel = async (value, level ) => {
  return level * Math.floor(value / level)
}
