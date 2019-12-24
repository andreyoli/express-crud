require('dotenv').config()
const express = require('express')
require('./src/database')
const app = express()

app.use(express.json())
app.use('/', require('./src/routes'))

app.listen(process.env.PORT, () => {
  console.log('Connected')
})
