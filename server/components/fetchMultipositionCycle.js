const {sleep} = require('./sleep')
const {fetchMultiposition} = require('./fetchMultiposition')
const {haveMultiposition} = require('./haveMultiposition')

const fetchMultipositionCycle = async function() {
  while(true) {
   
    if ( await haveMultiposition() ) {
    	console.log('fetchMultiposition', await haveMultiposition())
      	await fetchMultiposition()
      // console.log('have miltiposition => fetchMultiposition')
    }
    await sleep(1000*60*3)
  }
  
}
exports.fetchMultipositionCycle = fetchMultipositionCycle