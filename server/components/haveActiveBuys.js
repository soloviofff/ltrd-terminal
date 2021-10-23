const _ = require('lodash')

const haveActiveBuys = function() {
  if ( global.JOURNAL.positionLimits.length > 0 ) {
    return true
  } else {
    return false
  }
}

exports.haveActiveBuys = haveActiveBuys
