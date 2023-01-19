const { expect } = require('chai');
const { saleModel } = require('../../../src/models');
const { allSalesMock, saleById } = require('./mocks/saleModel.mock');

const sinon = require('sinon');
const connection = require('../../../src/models/connection');

describe('Testes unitários da saleModel', function () {
  it('Cadastrando uma venda com todas as informações corretas', async function () {
    const newSaleMock = [
      {
        productId: 1,
        quantity: 10,
      },
    ];
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await saleModel.createNewSale(newSaleMock);
    expect(result).to.equal(3);
  });

  it('Retorna a lista com todas as vendas cadastradas no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMock]);
    const result = await saleModel.showAllSales();
    expect(result).to.deep.equal(allSalesMock);
  });

  it('Retorna uma venda pelo seu ID', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);
    const result = await saleModel.showSalesById(1);
    expect(result).to.deep.equal(saleById);
  });

  it('É possível deletar uma venda existente no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await saleModel.deleteSale(1);
    expect(result).to.equal(1);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
