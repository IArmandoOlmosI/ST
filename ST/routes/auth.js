const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const { rows } = await db.query(
      'SELECT * FROM usuarios WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (rows.length > 0) {
      req.session.user = {
        id: rows[0].id_usuario,
        username: rows[0].username,
        isAdmin: rows[0].es_admin  // PostgreSQL ya devuelve boolean directamente
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

module.exports = router;