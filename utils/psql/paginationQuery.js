async function paginationQuery(
  initialQuery,
  initialParams,
  { page, size, pool = this }
) {
  const enablePagination = !!page;
  const offset = page * size - size;

  let sql = initialQuery;

  let params = initialParams;

  if (enablePagination) {
    sql += `
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `;

    params = [...params, size, offset];
  }

  const result = await pool.query(sql, params);
  return result?.rows ?? [];
}

module.exports = { paginationQuery };
