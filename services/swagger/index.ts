import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Movies API',
      description: 'Movie API documentation for use',
      contact: {
        name: 'Bryan Portillo',
        email: 'bportillodev@gmail.com',
        url: 'https://bryancloud.dev'
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token to access these api endpoints',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [{
      url: 'http://localhost:3000/api'
    }],
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/swaggerDocumentation/*.ts']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

export default swaggerDocs
