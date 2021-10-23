const {sleep} = require('./sleep')

const updateJournal = async function(data) {

  for (let [key, value] of Object.entries(data) ) {
    // console.log(key, value)
    global.JOURNAL[key] = value
  }
  await sleep(100)
}
exports.updateJournal = updateJournal
