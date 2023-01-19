const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { listAllProducts, newProduct } = require('./mocks/productController.mock');
const { expect } = chai;

chai.use(sinonChai);

describe('Testes unitários da productController', function () {
  it('Recuperando a lista de todos os produtos cadastrados', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'showAllProducts').resolves({ type: null, message: listAllProducts });
    await productController.showAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listAllProducts);
  });

  it('Recuperando um produto pelo seu ID', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'showProductById').resolves({ type: null, message: listAllProducts[0] });
    await productController.showProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listAllProducts[0]);
  });

  it('Retorna erro caso o ID do produto não exista', async function () {
    const req = { params: { id: 999 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'showProductById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    await productController.showProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Retorna erro caso o ID seja inválido', async function () {
    const req = { params: { id: -10 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'showProductById').resolves({ type: 'UNPROCESSABLE_ENTITY', message: '"id" must be a number' });
    await productController.showProductById(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
  });

  it('Retorna 201 em caso de produto cadastrado com sucesso', async function () {
    const req = { body: newProduct };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'createProduct').resolves({ type: null, message: { id: 4, ...newProduct } });
    await productController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, ...newProduct });
  });

  it('Retorna erro 400 ao tentar cadastrar um produto sem o atributo name', async function () {
    const req = { body: { alo: newProduct } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'createProduct').resolves({ type: 'BAD_REQUEST', message: '"name" is required' });
    await productController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Retorna erro 422 ao tentar cadastrar um produto com o atributo name menor do que cinco caracteres', async function () {
    const req = { body: { name: 'M' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'createProduct').resolves({ type: 'UNPROCESSABLE_ENTITY', message: '"name" length must be at least 5 characters long' });
    await productController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Retorna status 200 para atualização de produtos com sucesso', async function () {
    const req = { params: { id: 1 }, body: newProduct };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'updateProduct').resolves({ type: null, message: { id: 1, newProduct } });
    await productController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, newProduct });
  });

  it('Retorna erro 404 ao tentar atualizar um produto que não exista no banco de dados', async function () {
    const req = { params: { id: 5 }, body: newProduct };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'updateProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    await productController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Retorna status 204 para deleções em produtos cadastrados no banco de dados', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'deleteProduct').resolves({ type: null, message: '' });
    await productController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });
  
  it('Retorna status 404 quando tenta deletar produtos que não estão cadastrados no banco de dados', async function () {
    const req = { params: { id: 5 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'deleteProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    await productController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Retorna status 200 na busca de produtos pelo nome', async function () {
    const req = { query: { q: 'Martelo' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'showProductByTerm').resolves({ type: null, message: listAllProducts[0] });
    await productController.showProductByTerm(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listAllProducts[0]);
  });
 
  afterEach(function () {
    sinon.restore();
  });
});