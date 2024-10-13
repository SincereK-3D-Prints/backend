const config = require('config');
const { Pool } = require('pg');
const { paginationQuery } = require('../utils/psql/paginationQuery');
const { findOneQuery } = require('../utils/psql/findOneQuery');
const { findQuery } = require('../utils/psql/findQuery');

const pool = new Pool(config.get('postgres'));

pool.connect((error, client) => {
  if (error) {
    return console.error(
      'psql middleware: Error acquiring client',
      error.stack
    );
  }
  console.log('psql middleware: Pool has connected successfully!');
  client.query(`SET client_encoding TO 'UTF8'`);
});

pool.paginationQuery = paginationQuery;
pool.findOneQuery = findOneQuery;
pool.findQuery = findQuery;

const psql = async (req, res, next) => {
  req.psql = {
    pool,
  };

  next();
};

const close = async () => {
  await pool.end();
};

module.exports = {
  psql,
  pool,
  close
};
