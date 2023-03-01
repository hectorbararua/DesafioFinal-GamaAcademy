const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/token-decoded')
const { User } = require('../models/Index')

const verifyAdm = async (req, res, next) => {
  try {
    const token = getToken(req)
    const { id } = decodedToken(token)
    const user = await User.findById(id)

    if (user.role != 'adm') throw new Error(`Operação não permitida`)
    next()
  } catch (error) {
    return res.status(403).json({ message: error.message })
  }
}

module.exports = verifyAdm
