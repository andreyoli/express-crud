const User = require('../models/User')

module.exports = {
  async store (req, res) {
    const { name, password, email } = req.body
    const user = await User.create({ name, password, email })

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
  }
}
