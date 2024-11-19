const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';  
const endpointsFiles = ['./routes/*.js'];  

const doc = {
  info: {
    title: 'Users api',  
    description: 'Users api',  
  },
  host: 'localhost:3001',  
  basePath: '/',  
};

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
