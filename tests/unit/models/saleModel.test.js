const { expect } = require('chai');
const { saleModel } = require('../../../src/models');

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
  
  afterEach(function () {
    sinon.restore();
  });
});