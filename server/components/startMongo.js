const MongoClient = require('mongodb').MongoClient
const {sleep} = require('./sleep')


const startMongo = async function(mongoConf) {
  if (!mongoConf) return false

  const localMongoUrl = 'mongodb://'+mongoConf.username+':'+mongoConf.password+'@'+mongoConf.host+':'+mongoConf.port+'/'+mongoConf.db+'?authSource=admin'

  while(true) {
    try {
      const db = await MongoClient.connect(localMongoUrl)
      console.log('Connected to mongo')
      return db
    } catch (err) {
      console.log("Can't connect to mongo")
    }
    await sleep(1000)
  }
}

module.exports = startMongo
