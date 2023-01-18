const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const { listAllProducts, newProduct } = require('./mocks/productModel.mock');

const sinon = require('sinon');
const connection = require('../../../src/models/connection');

describe('Testes unitários da productModel', function () {
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

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 6 }]);
    const result = await productModel.createProduct(newProduct);
    expect(result).to.equal(6);
  });

  it('Atualizando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productModel.updateProduct(1, 'Martelo');
    expect(result).to.equal(1);
  });

  it('Deletando um produto cadastrado no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productModel.deleteProduct(1);
    expect(result).to.equal(1);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
