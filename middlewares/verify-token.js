const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/token-decoded')

const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso Negado!' })
  }

  const token = getToken(req)

  if (!token) {
    return res.status(401).json({ message: 'Acesso Negado!' })
  }

  try {
    const verify1 = decodedToken(token)
    req.user = verify1

    next()
  } catch (err) {
    return res.status(400).json({ message: 'Token Inválido!' })
  }
}

module.exports = checkToken
