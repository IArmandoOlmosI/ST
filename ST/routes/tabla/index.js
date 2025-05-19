const express = require('express');
const router = express.Router();

router.use('/', require('./vistaTabla'));
router.use('/', require('./adminPanel'));
router.use('/', require('./exportarExcel'));
router.use('/', require('./importarExcel'));

module.exports = router;
