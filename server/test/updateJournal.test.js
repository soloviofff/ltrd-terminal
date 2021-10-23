const {updateJournal} = require('../components/updateJournal')


it('test updateJournal', async () => {
  global.OPTIONS = {
    stock: 'binance',
    symbol: 'BTC/USDT',
    lot: 12,
    pocket: 300,
    targetProfitPercent: 3,
    maxLevel: 6800,
    fee: {
      maker: 0.01,
      taker: 0.01
    }
  }
  global.JOURNAL = {
    stock: 'binance',
    symbol: 'BTC/USDT',
    lot: 11,
    pocket: 150,
    targetProfitPercent: 1,
    maxLevel: 6300,
    fee: {
      maker: 0.01,
      taker: 0.01
    }
  }
  await updateJournal(global.OPTIONS)
  expect(global.JOURNAL.lot).toBe(12)
  expect(global.JOURNAL.pocket).toBe(300)
  expect(global.JOURNAL.targetProfitPercent).toBe(3)
});
