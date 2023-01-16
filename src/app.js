const express = require('express');
const { productRouter } = require('./routers');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
 
module.exports = app;
