const { pool } = require('../../middleware/psql');

const find = async () => {
  return pool.findQuery({ tableName: 'orders' });
};

const findOne = async (id) => {
  return pool.findOneQuery({ params: { id }, tableName: 'orders' });
};

const findByEmail = async (email) => {
  const sql = `
    SELECT * FROM orders
    WHERE email = $1
    ORDER BY created_at DESC;
  `;
  return await pool.query(sql, [email]);
};

const create = async (columns) => {
  return await pool.createQuery({ columns, tableName: 'orders' });
};

const update = async (id, columns) => {
  return await pool.updateQuery({ columns, params: { id }, tableName: 'orders' });
};

const updateProcessorStatus = async (id, processorStatus) => {
  const sql = `
    UPDATE orders
    SET processor_status = $2
    WHERE id = $1
    RETURNING *;
  `;
  return await pool.query(sql, [id, processorStatus]);
};

const updateShipping = async (id, { shipping_status, tracking_number, carrier }) => {
  const sql = `
    UPDATE orders
    SET 
      shipping_status = $2,
      tracking_number = $3,
      carrier = $4,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;
  return await pool.query(sql, [id, shipping_status, tracking_number, carrier]);
};

const destroy = async (id) => {
  const sql = `
    DELETE FROM orders
    WHERE id = $1;
  `;
  return await pool.query(sql, [id]);
};

module.exports = {
  find,
  findOne,
  findByEmail,
  create,
  update,
  updateProcessorStatus,
  updateShipping,
  destroy,
};