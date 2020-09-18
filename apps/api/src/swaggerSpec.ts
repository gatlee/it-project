import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pure && Lazy API',
      version: '1.0.0',
    },
    servers: [{ url: '/api/portfolio/' }],
  },
  apis: ['./apps/api/src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
