const router = require('express').Router()
const CardController = require('../controllers/CardController')

// middlewares
const verifyToken = require('../middlewares/verify-token')

router.get('/', CardController.lists)
router.get('/:id', CardController.listById)
router.post('/', verifyToken, CardController.create)
router.delete('/:id', verifyToken, CardController.delete)

module.exports = router
