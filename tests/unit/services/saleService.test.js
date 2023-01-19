const { expect } = require('chai');
const { saleService } = require('../../../src/services');
const { saleModel, productModel } = require('../../../src/models');
const { newSaleMock, salesMockById, allSalesMock, listAllProducts } = require('./mocks/sale.service.mock');

const sinon = require('sinon');

describe('Testes unitários da saleService', function () {
  it('Cadastrando uma venda', async function () {
    sinon.stub(productModel, 'showAllProducts').resolves(listAllProducts);
    sinon.stub(saleModel, 'createNewSale').resolves(3);
    const result = await saleService.createNewSale(newSaleMock.itemsSold);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(newSaleMock);
  });

  it('Retorna erro ao tentar cadastrar uma venda com productId inexistente no banco de dados', async function () {
    const newSaleMock = [
      {
        productId: 10,
        quantity: 1,
      },
    ];
    const result = await saleService.createNewSale(newSaleMock);
    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });

  it('Retorna erro ao tentar cadastrar uma venda sem o productId', async function () {
    const newSaleMock = [
      {
        product: 1,
        quantity: 6,
      },
    ];
    const result = await saleService.createNewSale(newSaleMock);
    expect(result.type).to.be.equal('BAD_REQUEST');
    expect(result.message).to.be.equal('"productId" is required');
  });

  it('Retorna erro ao tentar cadastrar uma venda com o quantity com valor inválido', async function () {
    const newSaleMock = [
      {
        productId: 1,
        quantity: -2,
      },
    ];
    const result = await saleService.createNewSale(newSaleMock);
    expect(result.type).to.be.equal('UNPROCESSABLE_ENTITY');
    expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
  });

  it('Retorna uma lista com todas as vendas cadastradas no banco', async function () {
    sinon.stub(saleModel, 'showAllSales').resolves(allSalesMock);
    const result = await saleService.showAllSales();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allSalesMock);
  });

  it('Retorna uma venda pelo seu Id', async function () {
    sinon.stub(saleModel, 'showSalesById').resolves(salesMockById);
    const result = await saleService.showSalesById(1);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(salesMockById);
  });
  
  it('Retorna erro ao consultar venda por um ID inexistente', async function () {
    const result = await saleService.showSalesById(10);
    expect(result.type).to.be.equal('SALE_NOT_FOUND');
    expect(result.message).to.be.equal('Sale not found');
  });

  it('É possível deletar uma venda que esteja cadastrada no banco de dados', async function () {
    sinon.stub(saleModel, 'deleteSale').resolves(1);
    const result = await saleService.deleteSale(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.equal('');
  });
  
  it('Retorna mensagem de erro ao tentar deletar uma venda inexistente no banco de dados', async function () {
    sinon.stub(saleModel, 'showSalesById').resolves([]);
    const result = await saleService.deleteSale(4);
    expect(result.type).to.equal('SALE_NOT_FOUND');
    expect(result.message).to.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
