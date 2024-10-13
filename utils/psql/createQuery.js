async function createQuery({ fields = {}, tableName, pool = this }) {
  // Build columns and placeholders for the query dynamically
  const columns = Object.keys(fields);
  const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

  const sql = `
    INSERT INTO ${tableName} (${columns.join(', ')})
    VALUES (${placeholders})
    RETURNING *;
  `;

  const values = Object.values(fields);

  try {
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error inserting into ${tableName}: ${error.message}`);
  }
}

module.exports = {
  createQuery,
};
