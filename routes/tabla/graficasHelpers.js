const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../auth');
const { obtenerGraficas } = require('./graficasHelpers');

// GET /tabla/graficas - Solo para administradores
router.get('/graficas', isAuthenticated, async (req, res) => {
    try {
        // Verificar que el usuario sea administrador
        if (!req.session.user.isAdmin) {
            return res.status(403).render('error', { 
                message: 'No tienes permisos para ver esta página',
                user: req.session.user 
            });
        }

        // Obtener los datos para las gráficas
        const { graficaData, gradosData, antiguedadData, generoData } = await obtenerGraficas();

        // Renderizar la vista de gráficas
        res.render('graficas', {
            user: req.session.user,
            graficaData,
            gradosData,
            antiguedadData,
            generoData,
            title: 'Gráficas de Análisis'
        });

    } catch (error) {
        console.error('Error al cargar gráficas:', error);
        res.status(500).render('error', { 
            message: 'Error al cargar las gráficas',
            user: req.session.user 
        });
    }
});

module.exports = router;