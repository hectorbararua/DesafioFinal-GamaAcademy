const router = require('express').Router()
const UserController = require('../controllers/UserController')

// middlewares
const verifyToken = require('../middlewares/verify-token')
const verifyAdm = require('../middlewares/verify-adm')
const AuthUserValidation = require('../validations/User/create')
const AuthUserUpdateValidation = require('../validations/User/update')
const AuthLoginValidation = require('../validations/auth/login')

router.post('/register', AuthUserValidation, UserController.register)
router.patch(
  '/:id',
  verifyToken,
  AuthUserUpdateValidation,
  UserController.updatedUser
)
router.post(
  '/registerADM',
  verifyToken,
  verifyAdm,
  AuthUserValidation,
  UserController.registerADM
)
router.post('/login', AuthLoginValidation, UserController.login)
router.get('/checkuser', UserController.checkUser)

module.exports = router
