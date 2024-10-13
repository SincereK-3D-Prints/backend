const { pool } = require('../../middleware/psql');

const find = async () => {
  return pool.findQuery({ tableName: 'products' });
};

const findOne = async (id) => {
  return pool.findOneQuery({ params: { id }, tableName: 'products' });
};

const create = async ({ name, price, description, image, colors, stock, shipping_cost, production_cost, production_time }) => {
  const sql = `
    INSERT INTO products (name, price, description, images, colors, stock, shipping_cost, production_cost, production_time)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const params = [name, price, description, image, colors, stock, shipping_cost, production_cost, production_time];
  return await pool.query(sql, params);
};

const update = async (id, { name, price, description, image, colors, stock, shipping_cost, production_cost, production_time }) => {
  const sql = `
    UPDATE products
    SET name = $2, price = $3, description = $4, images = $5, colors = $6, stock = $7, shipping_cost = $8, production_cost = $9, production_time = $10
    WHERE id = $1
    RETURNING *;
  `;
  const params = [id, name, price, description, image, colors, stock, shipping_cost, production_cost, production_time];
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
