const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
  async store (req, res) {
    const { name, password, email } = req.body
    const user = await User.create({ name, password, email })

    user.password = undefined
    return res.send(`User ${user.name} has been registered`)
  },

  async index (req, res) {
    const user = await User.findAll({ attributes: { exclude: ['password'] } })

    return res.json(user)
  },

  async delete (req, res) {
    const { email } = req.body

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    })
    await User.destroy({ where: { email } })

    return res.send(`User ${user.name} delete`)
  },

  async show (req, res) {
    const { id } = req.body
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    })

    return res.json(user)
  },

  async update (req, res) {
    const { name, email } = req.body
    const user = User.update({ name }, { where: { email } })

    res.json(user)
  },

  async auth (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      res.status(400).send({ error: 'user not found' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).send({ error: 'Invalid password' })
    }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400
    })

    res.send({ user, token })
  }
}
