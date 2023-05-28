const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Fluxo Caixa API',
    },
    host: 'localhost:8302',
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
    definitions: {
        User: {
            name: "Jhon Doe",
            username: "jhondoe",
            password: "jhondoe"
        },
        Transaction: {
            title: "transacao",
            desc: "descricao",
            amount: 0
        }
    },
};
const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);