import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: 'Users API',
        version: '1.0.0',
        description: 'Users API'
    },
    host: 'localhost:3000',
    basePath: '/api/users'
}

const outputFile = './swagger-output.json'
swaggerAutogen()(outputFile, ['./app.js'], doc)
