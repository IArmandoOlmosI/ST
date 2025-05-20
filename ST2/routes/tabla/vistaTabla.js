const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const { isAuthenticated } = require('../auth');
const { getCategoriesAndDegrees } = require('./herlpers');
const { obtenerGraficas } = require('./graficasHelpers');

// Ruta unificada para /tabla
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const { categorias, grados } = await getCategoriesAndDegrees();
    
    const { rows: trabajadores } = await db.query(`
      SELECT t.*, c.nombre as categoria, g.nombre as grado_academico
      FROM trabajadores t
      LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
      LEFT JOIN grados_academicos g ON t.id_grado = g.id_grado
    `);
    
    // Obtener datos para gráficas si el usuario es admin
    let graficas = {};
    if (req.session.user && req.session.user.isAdmin) {
      graficas = await obtenerGraficas();
    }

    res.render('tabla', {
      user: req.session.user,
      trabajadores,
      categorias,
      grados,
      ...graficas,
      searchParams: req.query || {}
    });
  } catch (error) {
    console.error('Error en tabla:', error);
    res.status(500).send('Error al cargar la tabla');
  }
});

// GET /tabla/search
router.get('/search', isAuthenticated, async (req, res) => {
  try {
    const { nombre, categoria, grado } = req.query;
    const { categorias, grados } = await getCategoriesAndDegrees();
    
    let sql = `
      SELECT t.*, c.nombre as categoria, g.nombre as grado_academico
      FROM trabajadores t
      LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
      LEFT JOIN grados_academicos g ON t.id_grado = g.id_grado
      WHERE 1=1
    `;
    
    const params = [];
    
    if (nombre && nombre.trim()) {
      sql += ` AND t.nombre_completo LIKE $${params.length + 1}`;
      params.push(`%${nombre}%`);
    }
    
    if (categoria) {
      sql += ` AND t.id_categoria = $${params.length + 1}`;
      params.push(categoria);
    }
    
    if (grado) {
      sql += ` AND t.id_grado = $${params.length + 1}`;
      params.push(grado);
    }
    
    
    const { rows: trabajadores } = await db.query(sql, params);
    
    // Obtener datos para gráficas si el usuario es admin
    let graficaData = null;
    let gradosData = null;
    let antiguedadData = null;
    let generoData = null;
    
    if (req.session.user && req.session.user.isAdmin) {
      ({ graficaData, gradosData, antiguedadData, generoData } = await obtenerGraficas());
    }
    
    res.render('tabla', {
      user: req.session.user,
      trabajadores,
      categorias,
      grados,
      graficaData,
      gradosData,
      antiguedadData, 
      generoData,
      searchParams: req.query
    });
  } catch (error) {
    console.error('Error en búsqueda:', error);
    res.status(500).send('Error al realizar la búsqueda');
  }
});


// Ruta para ver gráficas
router.get('/graficas', isAuthenticated, async (req, res) => {
  if (!req.session.user.isAdmin) return res.redirect('/tabla');
  
  try {
    const datosGraficas = await obtenerGraficas();
    res.render('graficas', { 
      user: req.session.user,
      ...datosGraficas
    });
  } catch (error) {
    console.error('Error al cargar gráficas:', error);
    res.status(500).send('Error al cargar las gráficas');
  }
});

module.exports = router;