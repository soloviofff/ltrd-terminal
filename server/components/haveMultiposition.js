
const _ = require('lodash')
const haveMultiposition = async function() {
  if ( !_.isEmpty(global.JOURNAL.multipositionInfo) ) {
    return true
  } else {
    return false
  }
}

exports.haveMultiposition = haveMultiposition
