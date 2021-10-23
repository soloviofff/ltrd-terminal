
const _ = require('lodash')
const removeLimitPosition = async function(payload) {
  const positionLimits = _.cloneDeep(global.JOURNAL.positionLimits)
  const index = positionLimits.findIndex(item => item.id === payload.id);
  if (index !== -1) {
    // console.log('REMOVING JOURNAL limit position', payload.id, index)
    positionLimits.splice(index, 1)
  }
  global.JOURNAL.positionLimits = positionLimits
}

exports.removeLimitPosition = removeLimitPosition
