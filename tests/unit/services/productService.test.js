const { expect } = require('chai');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { listAllProducts } = require('./mocks/product.service.mock');

const sinon = require('sinon');

describe('Testes unitários da camada service', function () {
  it('Recuperando a lista de todos os produtos cadastrados', async function () {
    sinon.stub(productModel, 'showAllProducts').resolves(listAllProducts);
    const result = await productService.showAllProducts();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(listAllProducts);
  });

  it('Recuperando um produto pelo seu ID', async function () {
    sinon.stub(productModel, 'showProductById').resolves(listAllProducts[0]);
    const result = await productService.showProductById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(listAllProducts[0]);
  });

  it('Retorna erro caso o ID do produto não exista', async function () {
    sinon.stub(productModel, 'showProductById').resolves(undefined);
    const result = await productService.showProductById(999);
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('Retorna erro caso o ID seja inválido', async function () {
    const result = await productService.showProductById(-10);
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  });

  afterEach(function () {
    sinon.restore();
  });
});
