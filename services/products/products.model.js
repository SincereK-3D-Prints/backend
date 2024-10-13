const { pool } = require('../../middleware/psql');

const find = async () => {
  return pool.findQuery({ tableName: 'products' });
};

const findOne = async (id) => {
  return pool.findOneQuery({ params: { id }, tableName: 'products' });
};

const create = async ({ name, price, description, image, colors, sizes, stock, sold, shipping_cost, production_cost, production_time }) => {
  const sql = `
      INSERT INTO products (name, price, description, images, colors, sizes, stock, sold, shipping_cost, production_cost, production_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
  `;
  const params = [name, price, description, image, colors, sizes, stock, sold, shipping_cost, production_cost, production_time];
  return await pool.query(sql, params);
};

const update = async (id, { name, price, description, image, colors, sizes, stock, sold, shipping_cost, production_cost, production_time }) => {
  const sql = `
      UPDATE products
      SET name = $2, price = $3, description = $4, images = $5, colors = $6, sizes = $7, stock = $8, sold = $9, shipping_cost = $10, production_cost = $11, production_time = $12
      WHERE id = $1
      RETURNING *;
  `;
  const params = [id, name, price, description, image, colors, sizes, stock, sold, shipping_cost, production_cost, production_time];
  return await pool.query(sql, params);
};

const destroy = async (id) => {
  const sql = `
      DELETE FROM products
      WHERE id = $1;
  `;
  return await pool.query(sql, [id]);
};

module.exports = {
  find,
  findOne,
  create,
  update,
  destroy
};
