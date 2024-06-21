const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');
const { promisify } = require('util');

const db = new sqlite3.Database('sincerek3dprints.db');

/** @type {function(string, any[]?): Promise<void>} */
const query = promisify(db.all.bind(db));

const load = file_path => fs.readFileSync(path.join(__dirname, file_path), 'utf8');

const initialize = async () => {
  try {
    await query(load('./email_subscriptions.sql'));
    console.log('Email Subscriptions table initialized.');
    return { db, query };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  db,
  initialize,
  query,
};
