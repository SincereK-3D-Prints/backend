const { pool } = require('../../middleware/psql');

const find = async () => {
  return pool.findQuery({ tableName: 'products' });
};

const findOne = async (id) => {
  return pool.findOneQuery({ params: { id }, tableName: 'products' });
};

const findSlug = async (slug) => {
  return pool.findOneQuery({ params: { slug }, tableName: 'products' });
};

const create = async (columns) => {
  return await pool.createQuery({ columns, tableName: 'products' });
};

const update = async (columns) => {
  return await pool.updateQuery({ columns, tableName: 'products' });
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
  findSlug,
  create,
  update,
  destroy,
};
