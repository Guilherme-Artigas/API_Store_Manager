const connection = require('./connection');

const showAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const showProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [...Object.values(name)],
  );
  return insertId;
};

const updateProduct = async ({ id, name }) => {
  const [{ affectedRows }] = await connection.execute(
    `
      UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?
    `,
    [name, id],
  ); return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `
      DELETE FROM StoreManager.products
      WHERE id = ?;
    `,
    [id],
  ); return affectedRows;
};

module.exports = {
  showAllProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
