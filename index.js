const express = require('express')
const app = express()
require('dotenv').config()

app.use('/', require('./src/routes'))

app.listen(process.env.PORT, () => {
  console.log('Hello World')
})
