async function updateQuery({ columns = {}, tableName, pool = this }) {
  // Extract the ID from columns
  const { id, ...fieldsToUpdate } = columns;

  if (!id) {
    throw new Error('ID is required for updating.');
  }

  // Build the SET clause dynamically for the fields to update
  const setClause = Object.keys(fieldsToUpdate)
    .map((key, index) => `${key} = $${index + 2}`) // $2 and onward for values, $1 reserved for id
    .join(', ');

  const sql = `
      UPDATE ${tableName}
      SET ${setClause}
      WHERE id = $1
          RETURNING *;
  `;

  const values = [id, ...Object.values(fieldsToUpdate)];

  try {
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating ${tableName}: ${error.message}`);
  }
}


module.exports = {
  updateQuery,
};
