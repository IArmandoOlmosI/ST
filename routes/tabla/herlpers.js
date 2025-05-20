const db = require('../../config/db');

async function getCategoriesAndDegrees() {
  const { rows: categorias } = await db.query('SELECT * FROM categorias');
  const { rows: grados } = await db.query('SELECT * FROM grados_academicos');
  return { categorias, grados };
}

module.exports = { getCategoriesAndDegrees };