const router = require('express').Router()
const ProductsController = require('../controllers/ProductsController')

// middlewares
const verifyToken = require('../middlewares/verify-token')
const verifyAdm = require('../middlewares/verify-adm')
const { imageUpload } = require('../helpers/image-upload')
const AuthProductValidation = require('../validations/Product/create')

router.post(
  '/',
  verifyToken,
  verifyAdm,
  imageUpload.single('images'),
  AuthProductValidation,
  ProductsController.register
)
router.get('/', ProductsController.listProducts)
router.get('/:id', ProductsController.listProduct)
router.patch(
  '/:id',
  imageUpload.single('images'),
  ProductsController.updateProduct
)
router.delete('/:id', ProductsController.deleteProducts)

module.exports = router
