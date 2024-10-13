async function findQuery({ columns = ['*'], params = {}, tableName, pool = this }) {
  const sql = `
    SELECT 
    ${columns.join(', ')} 
    FROM ${tableName}
    WHERE ${Object.keys(params)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(' AND ')}
    `;

  const search = await pool.query(sql, Object.values(params));

  if (search.rows.length === 0) {
    return [];
  }

  return search.rows[0];
}

module.exports = {
  findQuery,
};
