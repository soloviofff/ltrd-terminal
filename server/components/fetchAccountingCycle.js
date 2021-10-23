const {sleep} = require('./sleep')
const {historyRead} = require('./mongoActions')



const fetchAccountingCycle = async function() {
	while(true) {
		console.log('fetchAccountingCycle')
		global.ACCOUNTING = await historyRead()
		// console.log(ACCOUNTING)
		await sleep(1000 * 60 * 3)
	}
	
	
}
exports.fetchAccountingCycle = fetchAccountingCycle