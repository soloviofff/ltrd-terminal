const {mongoRead} = require('./mongoActions')
const {sleep} = require('./sleep')

const fetchJournal = async function() {
  // global.JOURNAL = await mongoRead(global.OPTIONS.symbol, global.OPTIONS.stock )
}


const initJournal = async function() {
  await fetchJournal()
}

exports.initJournal = initJournal
