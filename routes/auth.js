const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../config/db');

// Rutas de autenticación
router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Consulta
    const { rows } = await db.query(
      'SELECT * FROM usuarios WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];

      // Establecer sesión
      req.session.user = {
        id: user.id_usuario,
        username: user.username,
        isAdmin: user.es_admin === 1 
      };
      res.redirect('/tabla');
    } else {
      res.render('login', { error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error de login:', error);
    res.render('login', { error: 'Error en el servidor' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Middleware de autenticación
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

module.exports = {
  router,
  isAuthenticated
};