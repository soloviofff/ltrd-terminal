const _ = require('lodash')
const express = require('express')
const serializeError = require('serialize-error')
const router = express.Router({mergeParams: true})


router.get('/', (req, res) => {
  res.json('terminal-api')
})

module.exports = router
