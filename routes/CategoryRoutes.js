const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')

// middlewares
const verifyToken = require('../middlewares/verify-token')
const verifyAdm = require('../middlewares/verify-adm')

router.post('/', verifyToken, verifyAdm, CategoryController.register)
router.get('/', verifyToken, CategoryController.listCategories)
router.patch('/:id', verifyToken, verifyAdm, CategoryController.updateCategory)
router.delete('/:id', verifyToken, verifyAdm, CategoryController.deleteCategory)

module.exports = router
