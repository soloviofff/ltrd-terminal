const {sleep} = require('./sleep')
const {manager} = require('./manager')
const {mongoRead, mongoUpdate, historyRead, historyUpdate} = require('./mongoActions')
const {getBalance} = require('./getBalance')
const {getOrderbook} = require('./getOrderbook')
const {updateJournal} = require('./updateJournal')


const tasksCycle = async function() {
  while (true) {
    try {
      // get mongo

      const journal = await mongoRead(global.OPTIONS.symbol, global.OPTIONS.stock)
      if (journal) {
        await updateJournal(journal)
      }
      // console.log(global.JOURNAL)
      // запись настроечных параметров в журнал из файла options
      await updateJournal(global.OPTIONS)


      // сбор баланса
      try {
        await sleep(500)
        global.JOURNAL.balance = await getBalance(global.JOURNAL.coinFrom, global.JOURNAL.coinTo)
      } catch(err) {console.log(err)}

      console.log(global.JOURNAL.balance)
      // сбор среза катировок на текущий момент
      await sleep(500)
      console.log(global.JOURNAL.symbol)
      global.ORDERBOOK = await getOrderbook(global.JOURNAL.symbol)




      await manager()
      // save mongo

      await mongoUpdate(global.JOURNAL.symbol, global.JOURNAL.stock, global.JOURNAL)
    } catch(err){
      console.log(err)
    }
    await sleep(30*1000)
  }
}

exports.tasksCycle = tasksCycle
