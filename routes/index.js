const express = require('express')
const router = express.Router()
const bookRouter = require('./bookRoutes')
const userRouter = require('./userRoutes')
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/books', bookRouter)
router.use('/users', userRouter)

module.exports = router