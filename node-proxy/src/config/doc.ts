import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de JusteManger',
      version: '1.0.0',
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      }
  },
  apis: ['./src/proxy/routes/*Routes.ts'], // files containing annotations as above
};

export const openapiSpecification = swaggerJsdoc(options);