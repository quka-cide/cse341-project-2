const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const auth = require('../middleware/authMiddleware')

router.get('/', auth, bookController.getBooks)
router.get('/:id', bookController.getOneBook)
router.post('/', auth, bookController.createBook)
router.put('/:id', bookController.updateBook)
router.delete('/:id', bookController.deleteBook)

module.exports = router