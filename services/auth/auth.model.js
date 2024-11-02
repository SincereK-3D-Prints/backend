const { pool } = require('../../middleware/psql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tableName = 'users';

const findByEmail = async (email) => {
  return pool.findOneQuery({ params: { email }, tableName });
};

const findById = async (id) => {
  return pool.findOneQuery({ params: { id }, tableName });
};

const create = async ({ email, password, facebook_id, google_id }) => {
  const columns = {
    email,
    created_at: new Date(),
    updated_at: new Date()
  };

  if (facebook_id) {
    columns.facebook_id = facebook_id;
  }

  if (google_id) {
    columns.google_id = google_id;
  }

  if (password) {
    columns.password = await bcrypt.hash(password, 10);
  }

  return pool.createQuery({ columns, tableName });
};

const update = async (columns) => {
  columns.updated_at = new Date();
  return pool.updateQuery({ columns, tableName });
};

const updateLastLogin = async (id) => {
  const columns = {
    id,
    last_login: new Date(),
    updated_at: new Date()
  };

  return pool.updateQuery({ columns, tableName });
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = {
  findByEmail,
  findById,
  create,
  update,
  updateLastLogin,
  verifyPassword,
  generateToken
};
