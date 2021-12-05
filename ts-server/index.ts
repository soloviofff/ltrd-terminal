import express from 'express'
const app = express()

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import cors from 'cors'
app.use(cors())

const api = require('./api/api')
app.use('/ltrd-api', api)

var port = '127.0.0.1'
var server = app.listen(8000, port, () => {
  console.log('Profitmaker server launched on 8000 port')
})





import { Engines } from './engines'
import HasuraDb from './engines/hasura'
import PositionManager from './ltrd/position_manager'

const main = async () => {
  Engines.hasura = new HasuraDb()
  Engines.positionManager = new PositionManager()

  // console.log(Engines)
}
main ()
