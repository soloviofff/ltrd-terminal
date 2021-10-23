const _ = require('lodash')
const express = require('express')
const serializeError = require('serialize-error')
var router = express.Router({mergeParams: true})
// const { v1: uuidv1 } = require('uuid');

const {updateJournal} = require('../components/updateJournal')
const {mongoUpdate} = require('../components/mongoActions')

const {createLimitsSteps} = require('../components/createLimitsSteps')
const {removeLimitsSteps} = require('../components/removeLimitsSteps')

const {placeMultiposition} = require('../components/placeMultiposition')
const {removeMultiposition} = require('../components/removeMultiposition')

router.get('/', (req, res) => {
  res.json('terminal-api')
})

// router.post('/request-extracion', (req, res) => {
//   console.log(req.body)
//   res.json(uuidv1())
// })

router.get('/ohlcv', (req, res) => {
  res.json(global.OHLCV)
})

router.get('/orderbook', (req, res) => {
  res.json(global.ORDERBOOK)
})

router.get('/journal', (req, res) => {
  res.json(global.JOURNAL)
})

router.get('/accounting', (req, res) => {
  res.json(global.ACCOUNTING)
})

router.post('/update-journal', async (req, res) => {
  console.log(req.body)
  await updateJournal(req.body)
  await mongoUpdate(global.JOURNAL.symbol, global.JOURNAL.stock, global.JOURNAL)
  res.json(global.JOURNAL)
})

router.get('/place-grid', async (req, res) => {
  console.log('place-grid')
  await createLimitsSteps()
  await mongoUpdate(global.JOURNAL.symbol, global.JOURNAL.stock, global.JOURNAL)
  res.json(global.JOURNAL)
})

router.get('/remove-grid', async (req, res) => {
  console.log('remove-grid')
  await removeLimitsSteps()
  res.json(global.JOURNAL)
})

router.get('/place-multiposition', async (req, res) => {
  console.log('place-multiposition')
  await placeMultiposition()
  await mongoUpdate(global.JOURNAL.symbol, global.JOURNAL.stock, global.JOURNAL)
  res.json(global.JOURNAL)
})

router.get('/remove-multiposition', async (req, res) => {
  console.log('remove-multiposition')
  await removeMultiposition()
  await mongoUpdate(global.JOURNAL.symbol, global.JOURNAL.stock, global.JOURNAL)
  res.json(global.JOURNAL)
})

// router.get('/place-multiposition', async (req, res) => {
//   console.log('place-multiposition')
//   res.json(global.JOURNAL)
// })


module.exports = router
