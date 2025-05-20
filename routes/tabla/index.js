const express = require('express');
const router = express.Router();

// Importar los módulos correctamente
const vistaTablaRouter = require('./vistaTabla');
const adminPanelRouter = require('./adminPanel');
const exportarExcelRouter = require('./exportarExcel');
const importarExcelRouter = require('./importarExcel');
const graficasViewRouter = require('./graficasRouter'); // Nueva ruta para gráficas

// Usar los routers importados
router.use('/', vistaTablaRouter);
router.use('/', adminPanelRouter);
router.use('/', exportarExcelRouter);
router.use('/', importarExcelRouter);
router.use('/', graficasViewRouter); // Agregar la nueva ruta

module.exports = router;