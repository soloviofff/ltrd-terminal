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







const main = async () => {


}
main ()
