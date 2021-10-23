const {sleep} = require('./sleep')

const catchHead = async function(rateLimit, stock) {
  if (rateLimit === undefined) rateLimit = 500
  while (true) {
    if ( global.sleepUntil[stock] == undefined ) {
      global.sleepUntil[stock] = Date.now() + rateLimit + 100
      break
    } else if ( global.sleepUntil[stock] < new Date() ) {
      global.sleepUntil[stock] = Date.now() + rateLimit + 100
      break
    } else {
      await sleep(200)
    }
  }
}

exports.catchHead = catchHead
