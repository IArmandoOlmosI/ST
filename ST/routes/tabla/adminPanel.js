const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./middleware');
const { getCategoriesAndDegrees } = require('./helpers');

router.get('/admin', isAuthenticated, async (req, res) => {
  if (!req.session.user.isAdmin) return res.redirect('/tabla');
  try {
    const { categorias, grados } = await getCategoriesAndDegrees();
    res.render('admin', { user: req.session.user, categorias, grados });
  } catch (error) {
    console.error('Error en panel admin:', error);
    res.status(500).send('Error al cargar el panel de administración');
  }
});

module.exports = router;
