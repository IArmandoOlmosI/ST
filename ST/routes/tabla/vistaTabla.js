const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const { isAuthenticated } = require('./middleware');
const { getCategoriesAndDegrees } = require('./helpers');
const { obtenerGraficas } = require('./graficas');

// GET /
router.get('/', isAuthenticated, async (req, res) => {
  try {
      const { categorias, grados } = await getCategoriesAndDegrees();
      const {rows:trabajadores} = await db.query(`
        SELECT t.*, c.nombre as categoria, g.nombre as grado_academico
        FROM trabajadores t
        LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
        LEFT JOIN grados_academicos g ON t.id_grado = g.id_grado
      `);

      let graficaData = null;
      let gradosData = null;
      let antiguedadData = null;
      let generoData = null;

      if (req.session.user.isAdmin) {
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
        searchParams: req.query || {}
      });

    } catch (error) {
      console.error('Error en tabla:', error);
      res.status(500).send('Error al cargar la tabla');
    }
});

// GET /search
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
        sql += ` AND t.nombre_completo LIKE ?`;
        params.push(`%${nombre}%`);
      }

      if (categoria) {
        sql += ` AND t.id_categoria = ?`;
        params.push(categoria);
      }

      if (grado) {
        sql += ` AND t.id_grado = ?`;
        params.push(grado);
      }

      const {rows:trabajadores} = await db.query(sql, params);

      let graficaData = null;
      let gradosData = null;
      let antiguedadData = null;
      let generoData = null;

      if (req.session.user.isAdmin) {
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

module.exports = router;
