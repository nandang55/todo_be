const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'API untuk aplikasi Todo List',
    },
    servers: [
      {
        url: '/api',
        description: 'Development server',
      },
    ],
    basePath: '/api',
  },
  apis: ['./src/routes/*.js'], // Path ke file yang berisi anotasi Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs; 