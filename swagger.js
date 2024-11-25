const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';  
const endpointsFiles = ['./routes/*.js'];     

const doc = {
  info: {
    title: 'products api',  
    description: 'API documentation for managing products',  
  },
  host: 'localhost: 8080',  
  basePath: '/',  
};

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
