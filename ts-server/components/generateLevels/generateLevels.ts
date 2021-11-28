
export const generateLevels = async (maxLevel, step, numberOfSteps) => {
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
