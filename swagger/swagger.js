const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Book Tracker API',
        description: 'API for managing a personal reading list'
    },
    host: process.env.HOST,
    Schemas: ['http', 'https']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)