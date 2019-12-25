const express = require('express')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Hello World')
})

routes.post('/user_register', UserController.store)
routes.delete('/user_destroy', UserController.delete)
routes.get('/user_index', UserController.index)
routes.get('/user_find', UserController.show)
routes.put('/user_update', UserController.update)

module.exports = routes
