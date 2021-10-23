const haveSourseOrders = function() {
  if ( global.JOURNAL.multipositionSourseOrders.length > 0 ) {
    return true
  } else {
    return false
  }
}

exports.haveSourseOrders = haveSourseOrders
