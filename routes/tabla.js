const express = require('express');
const router = express.Router();
const db = require('../config/db');

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}


router.get('/', isAuthenticated, async (req, res) => {
  try {
    // información de categoría y grado académico
    const [trabajadores] = await db.execute(`
      SELECT t.*, c.nombre as categoria, g.nombre as grado_academico
      FROM trabajadores t
      LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
      LEFT JOIN grados_academicos g ON t.id_grado = g.id_grado
    `);
    
    res.render('tabla', {
      user: req.session.user,
      trabajadores: trabajadores
    });
  } catch (error) {
    console.error('Error en tabla:', error);
    res.status(500).send('Error al cargar el tabla');
  }
});

// admin para agregar/editar trabajadores
router.get('/admin', isAuthenticated, async (req, res) => {
  //si el usuario es admin
  if (!req.session.user.isAdmin) {
    return res.redirect('/tabla');
  }
  
  try {
    const [categorias] = await db.execute('SELECT * FROM categorias');
    const [grados] = await db.execute('SELECT * FROM grados_academicos');
    
    res.render('admin', {
      user: req.session.user,
      categorias: categorias,
      grados: grados
    });
  } catch (error) {
    console.error('Error en panel admin:', error);
    res.status(500).send('Error al cargar el panel de administración');
  }
});

// Agregar nuevo trabajador
router.post('/worker/add', isAuthenticated, async (req, res) => {
  if (!req.session.user.isAdmin) {
    return res.status(403).send('Acceso denegado');
  }
  
  try {
    const {
      numero_trabajador,
      nombre_completo,
      genero,
      rfc,
      curp,
      id_categoria,
      id_grado,
      antiguedad_unam,
      antiguedad_carrera,
      email_institucional,
      telefono_casa,
      telefono_celular,
      direccion
    } = req.body;
    
    await db.execute(
      `INSERT INTO trabajadores (
        numero_trabajador, nombre_completo, genero, rfc, curp,
        id_categoria, id_grado, antiguedad_unam, antiguedad_carrera,
        email_institucional, telefono_casa, telefono_celular, direccion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        numero_trabajador, nombre_completo, genero, rfc, curp,
        id_categoria, id_grado, antiguedad_unam, antiguedad_carrera,
        email_institucional, telefono_casa, telefono_celular, direccion
      ]
    );
    
    res.redirect('/tabla');
  } catch (error) {
    console.error('Error al agregar trabajador:', error);
    res.status(500).send('Error al agregar trabajador');
  }
});

// Editar
router.get('/worker/edit/:id', isAuthenticated, async (req, res) => {
  if (!req.session.user.isAdmin) return res.status(403).send('Acceso denegado');

  try {
    const [trabajador] = await db.execute(
      'SELECT * FROM trabajadores WHERE id_trabajador = ?', 
      [req.params.id]
    );
    
    const [categorias] = await db.execute('SELECT * FROM categorias');
    const [grados] = await db.execute('SELECT * FROM grados_academicos');

    res.render('edit-worker', {
      user: req.session.user,
      trabajador: trabajador[0],
      categorias,
      grados
    });
  } catch (error) {
    console.error('Error al cargar edición:', error);
    res.status(500).send('Error al cargar formulario');
  }
});

//Actualizar
router.post('/worker/update/:id', isAuthenticated, async (req, res) => {
  if (!req.session.user.isAdmin) return res.status(403).send('Acceso denegado');

  try {
    const {
      numero_trabajador,
      nombre_completo,
      genero,
      // ... todos los campos del formulario
    } = req.body;

    await db.execute(
      `UPDATE trabajadores SET
        numero_trabajador = ?,
        nombre_completo = ?,
        genero = ?,
        rfc = ?,
        curp = ?,
        id_categoria = ?,
        id_grado = ?,
        antiguedad_unam = ?,
        antiguedad_carrera = ?,
        email_institucional = ?,
        telefono_casa = ?,
        telefono_celular = ?,
        direccion = ?
      WHERE id_trabajador = ?`,
      [
        numero_trabajador,
        nombre_completo,
        genero,
        rfc,
        curp,
        id_categoria,
        id_grado,
        antiguedad_unam,
        antiguedad_carrera,
        email_institucional,
        telefono_casa,
        telefono_celular,
        direccion,
        req.params.id // ID del trabajador a actualizar
      ]
    );

    res.redirect('/tabla');
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).send('Error al actualizar trabajador');
  }
});

//Eliminar
router.get('/worker/delete/:id', isAuthenticated, async (req, res) => {
  if (!req.session.user.isAdmin) return res.status(403).send('Acceso denegado');

  try {
    await db.execute(
      'DELETE FROM trabajadores WHERE id_trabajador = ?',
      [req.params.id]
    );
    res.redirect('/tabla');
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).send('Error al eliminar trabajador');
  }
});


module.exports = router;