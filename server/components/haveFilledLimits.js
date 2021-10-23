const haveFilledLimits = function() {
  if ( global.JOURNAL.filledLimits.length > 0 ) {
    return true
  } else {
    return false
  }
}

exports.haveFilledLimits = haveFilledLimits
