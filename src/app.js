const express = require('express');
const { productRouter, saleRouter } = require('./routers');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);
 
module.exports = app;
