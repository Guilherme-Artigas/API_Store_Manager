const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const { listAllProducts } = require('./mocks/productModel.mock');

const sinon = require('sinon');
const connection = require('../../../src/models/connection');

describe('Testes unitários da camada Model', function () {
  it('Recuperando a lista de todos os produtos cadastrados', async function () {
    sinon.stub(connection, 'execute').resolves([listAllProducts]);
    const result = await productModel.showAllProducts();
    expect(result).to.be.deep.equal(listAllProducts);
  });

  it('Recuperando um produto pelo seu ID', async function () {
    sinon.stub(connection, 'execute').resolves([[listAllProducts[0]]]);
    const result = await productModel.showProductById(1);
    expect(result).to.be.deep.equal(listAllProducts[0]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
