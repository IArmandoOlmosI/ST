const db = require('../../config/db'); // Cambiado de database a db para ser consistente

async function obtenerGraficas() {
  try {
    // Para PostgreSQL, usamos la sintaxis específica para consultas
    // Note: En PostgreSQL, podemos usar directamente consultas parametrizadas con la biblioteca 'pg'
    
    // Consulta para categorías
    const categoriasResult = await db.query(`
      SELECT c.nombre AS categoria, COUNT(*) AS total
      FROM trabajadores t
      LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
      GROUP BY c.nombre
    `);
    const categoriasConteo = categoriasResult.rows;
    const graficaData = {
      labels: categoriasConteo.map(row => row.categoria || 'Sin categoría'),
      valores: categoriasConteo.map(row => row.total)
    };
    
    // Consulta para grados académicos
    const gradosResult = await db.query(`
      SELECT g.nombre AS grado, COUNT(*) AS total
      FROM trabajadores t
      LEFT JOIN grados_academicos g ON t.id_grado = g.id_grado
      GROUP BY g.nombre
    `);
    const gradosConteo = gradosResult.rows;
    const gradosData = {
      labels: gradosConteo.map(row => row.grado || 'Sin grado'),
      valores: gradosConteo.map(row => row.total)
    };
    
    // Consulta para antigüedad
    const antiguedadResult = await db.query(`
      SELECT
        CASE
          WHEN antiguedad_unam IS NULL THEN 'Sin dato'
          WHEN antiguedad_unam < 5 THEN 'Menos de 5 años'
          WHEN antiguedad_unam BETWEEN 5 AND 9 THEN '5-9 años'
          WHEN antiguedad_unam BETWEEN 10 AND 14 THEN '10-14 años'
          WHEN antiguedad_unam BETWEEN 15 AND 19 THEN '15-19 años'
          WHEN antiguedad_unam BETWEEN 20 AND 29 THEN '20-29 años'
          ELSE '30 años o más'
        END AS rango_antiguedad,
        COUNT(*) AS total
      FROM trabajadores
      GROUP BY rango_antiguedad
      ORDER BY 
        CASE rango_antiguedad
          WHEN 'Sin dato' THEN 0
          WHEN 'Menos de 5 años' THEN 1
          WHEN '5-9 años' THEN 2
          WHEN '10-14 años' THEN 3
          WHEN '15-19 años' THEN 4
          WHEN '20-29 años' THEN 5
          WHEN '30 años o más' THEN 6
        END
    `);
    const antiguedadConteo = antiguedadResult.rows;
    const antiguedadData = {
      labels: antiguedadConteo.map(row => row.rango_antiguedad),
      valores: antiguedadConteo.map(row => row.total)
    };
    
    // Consulta para género
    const generoResult = await db.query(`
      SELECT 
        CASE 
          WHEN genero = 'M' THEN 'Masculino'
          WHEN genero = 'F' THEN 'Femenino'
          ELSE 'Otro'
        END AS genero,
        COUNT(*) AS total
      FROM trabajadores
      GROUP BY genero
    `);
    const generoConteo = generoResult.rows;
    const generoData = {
      labels: generoConteo.map(row => row.genero),
      valores: generoConteo.map(row => row.total)
    };
    
    return { 
      graficaData: categoriasConteo.length > 0 ? graficaData : null, 
      gradosData: gradosConteo.length > 0 ? gradosData : null, 
      antiguedadData: antiguedadConteo.length > 0 ? antiguedadData : null, 
      generoData: generoConteo.length > 0 ? generoData : null 
    };
  } catch (error) {
    console.error("Error al obtener datos para gráficas:", error);
    return { graficaData: null, gradosData: null, antiguedadData: null, generoData: null };
  }
}

module.exports = {
  obtenerGraficas
};