

const mongoUpdate = async function(symbol, stock, data) {
  await global.MONGO.collection('journal').replaceOne({'symbol': symbol, 'stock': stock}, data, {upsert: true})
}

const mongoRead = async function(symbol, stock) {
  return await global.MONGO.collection('journal').findOne({'symbol': symbol, 'stock': stock})
}

const historyInsertNew = async function(data) {
  return await global.MONGO.collection('results').insert(data)
}

const historyRead = async function(symbol, stock) {
  return await global.MONGO.collection('results').find({}).toArray()
}

const historyUpdate = async function(symbol, stock, data) {
  await global.MONGO.collection('results').replaceOne({'symbol': symbol, 'stock': stock}, data, {upsert: true})
}

exports.mongoUpdate = mongoUpdate
exports.mongoRead = mongoRead
exports.historyRead = historyRead
exports.historyUpdate = historyUpdate
exports.historyInsertNew = historyInsertNew
