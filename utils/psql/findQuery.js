async function findQuery({ columns = ['*'], params = {}, tableName, pool = this }) {
  let sql = `
      SELECT
          ${columns.join(', ')}
      FROM ${tableName}
  `;

  // If there are parameters, add a WHERE clause
  if (Object.keys(params).length > 0) {
    sql += `WHERE ${Object.keys(params)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(' AND ')}`;
  }

  const values = Object.values(params);

  const search = await pool.query(sql, values);

  if (search.rows.length === 0) {
    return [];
  }

  return search.rows;
}

module.exports = {
  findQuery,
};
