const { expect } = require('chai');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { newSaleMock } = require('./mocks/sale.service.mock');

const sinon = require('sinon');

describe('Testes unitários da saleService', function () {
  it('Cadastrando uma venda', async function () {
    sinon.stub(saleModel, 'createNewSale').resolves(3);
    const result = await saleService.createNewSale(newSaleMock.itemsSold);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(newSaleMock);
  });

  it('Retorna erro ao tentar cadastrar uma venda com productId inexistente no banco', async function () {
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

  afterEach(function () {
    sinon.restore();
  });
});
