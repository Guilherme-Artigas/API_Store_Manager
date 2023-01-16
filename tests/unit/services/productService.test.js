const { expect } = require('chai');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { listAllProducts, newProduct } = require('./mocks/product.service.mock');

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
    expect(result.type).to.equal('UNPROCESSABLE_ENTITY');
    expect(result.message).to.equal('"value" must be greater than or equal to 1');
  });

  it('Retorna 201 em caso de produto cadastrado com sucesso', async function () {
    sinon.stub(productModel, 'createProduct').resolves(4);
    sinon.stub(productModel, 'showProductById').resolves({ id: 4, ...newProduct });
    const result = await productService.createProduct(newProduct.name);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal({ id: 4, ...newProduct });
  });

  it('Retorna erro 400 ao tentar cadastrar um produto sem o atributo name', async function () {
    const result = await productService.createProduct();
    expect(result.type).to.equal('BAD_REQUEST');
    expect(result.message).to.equal('"name" is required');
  });

  it('Retorna erro 422 ao tentar cadastrar um produto com o atributo name menor do que cinco caracteres', async function () {
    const result = await productService.createProduct('M');
    expect(result.type).to.equal('UNPROCESSABLE_ENTITY');
    expect(result.message).to.equal('"name" length must be at least 5 characters long');
  });

  afterEach(function () {
    sinon.restore();
  });
});
