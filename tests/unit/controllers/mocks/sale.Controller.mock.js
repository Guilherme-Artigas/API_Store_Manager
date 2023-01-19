const newSaleMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    },
  ]
};

const salesMockById = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2
  },
];

const allSalesMock = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2
  },
];

const updateSaleMock = [
  {
    productId: 1,
    quantity: 10
  },
  {
    productId: 2,
    quantity: 50
  },
];

module.exports = {
  newSaleMock,
  salesMockById,
  allSalesMock,
  updateSaleMock,
};

