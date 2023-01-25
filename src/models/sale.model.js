const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./connection');

const showAllSales = async () => {
  const [result] = await connection.execute(
    `
      SELECT S_P.sale_id, S.date, S_P.product_id, S_P.quantity
      FROM StoreManager.sales_products AS S_P
      INNER JOIN StoreManager.sales AS S
      ON S_P.sale_id = S.id
      ORDER BY S_P.sale_id;
    `,
  );
  return camelize(result);
};

const showSalesById = async (id) => {
  const [result] = await connection.execute(
    `
      SELECT S.date, S_P.product_id, S_P.quantity
      FROM StoreManager.sales_products AS S_P
      INNER JOIN StoreManager.sales AS S
      ON S_P.sale_id = S.id
      WHERE S_P.sale_id = ?;
    `,
    [id],
  );
  return camelize(result);
};

const createNewSale = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  sale.forEach(async (p) => {
    const columns = Object.keys(snakeize(p)).join(', ');
    const placeholders = Object.keys(p).map((_key) => '?').join(', ');
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
      [insertId, ...Object.values(p)],
    );
  }); return insertId;
};

const updateSale = async (saleListUpdated) => {
  saleListUpdated.forEach(async (sale) => {
    await connection.execute(
      `
      UPDATE StoreManager.sales_products
      SET quantity = (
        CASE product_id
        WHEN ? THEN ?
        ELSE quantity
      END);
    `,
      [sale.productId, sale.quantity],
    );
  });
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `
      DELETE FROM StoreManager.sales
      WHERE id = ?;
    `,
    [id],
  ); return affectedRows;
};

module.exports = {
  showAllSales,
  showSalesById,
  createNewSale,
  updateSale,
  deleteSale,
};
