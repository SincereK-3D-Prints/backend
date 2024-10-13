const config = require('config');
const { Pool } = require('pg');
const { paginationQuery } = require('../utils/psql/paginationQuery');
const { findOneQuery } = require('../utils/psql/findOneQuery');
const { findQuery } = require('../utils/psql/findQuery');
const { createQuery } = require("../utils/psql/createQuery");
const { updateQuery } = require("../utils/psql/updateQuery");

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
pool.createQuery = createQuery;
pool.updateQuery = updateQuery;

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
