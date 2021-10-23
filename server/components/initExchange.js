const ccxt = require ('ccxt')

const initPublic = async function(exchange) {
  global.CCXT['public'] = new ccxt[exchange] ({
    'enableRateLimit': true
  })
}

const initSafe = async function(apiKey, secret, exchange) {
  global.CCXT['safe'] = new ccxt[exchange] ({
    'enableRateLimit': true,
    'apiKey': apiKey,
    'secret': secret,
  })
}

const initNotSafe = async function(apiKey, secret, exchange) {
  global.CCXT['notSafe'] = new ccxt[exchange] ({
    'enableRateLimit': true,
    'apiKey': apiKey,
    'secret': secret,
  })
}

exports.initSafe = initSafe
exports.initNotSafe = initNotSafe
exports.initPublic = initPublic
