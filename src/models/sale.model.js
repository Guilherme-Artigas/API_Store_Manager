const snakeize = require('snakeize');
const connection = require('./connection');

const createNewSale = async (sale) => {
  const DATE_HOUR = new Date();
  const DATE = DATE_HOUR.toISOString().slice(0, 10);
  const HOUR = DATE_HOUR.toUTCString().slice(16, 25);
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?)',
    [`${DATE}${HOUR}`],
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

module.exports = {
  createNewSale,
};
