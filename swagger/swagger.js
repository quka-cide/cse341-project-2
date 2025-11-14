const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Book Tracker API',
        description: 'API for managing a personal reading list'
    },
    host: 'localhost:8080/api',
    Schemas: ['http']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)