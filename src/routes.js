const express = require('express')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Hello World')
})

routes.post('/user_register', UserController.store)

module.exports = routes
