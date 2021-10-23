const {mongoRead} = require('./mongoActions')
const {sleep} = require('./sleep')

const fetchJournal = async function() {
  global.JOURNAL = await mongoRead(global.OPTIONS.symbol, global.OPTIONS.stock )
}

const fetchJournalCycle = async function() {
  while(true) {
    console.log('fetchJournalCycle')
    await fetchJournal()
    await sleep(1000*30)
  }
}

exports.fetchJournalCycle = fetchJournalCycle
