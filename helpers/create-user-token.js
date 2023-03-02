const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

const createUserToken = async (user, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    secret.key
  )

  res.status(200).json({
    message: 'Você está autenticado',
    token: token,
    userId: user.id,
    Email: user.email,
    role: user.role
  })
}

module.exports = createUserToken
