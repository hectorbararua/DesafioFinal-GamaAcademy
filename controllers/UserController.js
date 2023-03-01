const { User } = require('../models/Index')
const bcrypt = require('bcrypt')

// helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/token-decoded')

module.exports = class UserController {
  static async register(req, res) {
    try {
      const { name, email, password, confirmpassword } = req.body

      if (password !== confirmpassword)
        throw new Error('A senha e a confirmação de senha precisam ser igual')

      // check if email exists -  verificar se o email existe no db
      const userExists = await User.findOne({ email })

      if (userExists) throw new Error('Por favor, Utilize outro email!')

      // create a password  - criar uma senha
      const salt = await bcrypt.genSalt(12)
      const passwordBcrypt = await bcrypt.hash(password, salt)

      const roleClient = 'Cliente'

      const user = new User({
        name,
        email,
        password: passwordBcrypt,
        confirmpassword: passwordBcrypt,
        role: roleClient
      })

      const newUser = await user.save()

      await createUserToken(newUser, res)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async updatedUser(req, res) {
    try {
      const { id } = req.params

      const { name, email, password, confirmpassword } = req.body

      if (password !== confirmpassword)
        throw new Error('A senha e a confirmação de senha precisam ser igual')

      const salt = await bcrypt.genSalt(12)
      const passwordBcrypt = await bcrypt.hash(password, salt)

      const updated = await User.findByIdAndUpdate(id, {
        name,
        email,
        password: passwordBcrypt,
        confirmpassword: passwordBcrypt
      })

      res.json({ message: 'Usuário Atualizado com sucesso!' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
  static async registerADM(req, res) {
    try {
      const { name, email, password, confirmpassword } = req.body

      // validations - validação

      if (password !== confirmpassword)
        throw new Error('A senha e a confirmação de senha precisam ser igual')

      // check if email exists -  verificar se o email existe no db
      const userExists = await User.findOne({ email })

      if (userExists) throw new Error('Por favor, Utilize outro email!')

      // create a password  - criar uma senha
      const salt = await bcrypt.genSalt(12)
      const passwordBcrypt = await bcrypt.hash(password, salt)

      const roleADM = 'adm'

      const user = new User({
        name,
        email,
        password: passwordBcrypt,
        confirmpassword: passwordBcrypt,
        role: roleADM
      })

      const newUser = await user.save()

      await createUserToken(newUser, res)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      // check if email exists -  verificar se o email existe no db
      const user = await User.findOne({ email })
      if (!user) throw new Error('E-mail ou senha Incorretos!')

      const checkPassword = await bcrypt.compare(password, user.password)
      if (!checkPassword) throw new Error('Senha Inválida')

      await createUserToken(user, res)
    } catch (error) {
      console.log(error)
      res.status(401).json({ message: error.message })
    }
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = decodedToken(token)
      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined
      currentUser.confirmpassword = undefined
    } else {
      currentUser = null
    }
    res.status(200).send(currentUser)
  }
}
