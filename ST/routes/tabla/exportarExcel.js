const express = require('express');
const ExcelJS = require('exceljs');

router.get('/exportar', isAuthenticated, async (req, res) => {
    if (!req.session.user.isAdmin) {
      return res.status(403).send('No autorizado');
    }

    try {
      const { nombre, categoria, grado } = req.query;

      let sql = `
        SELECT t.id_trabajador, t.numero_trabajador, t.nombre_completo, 
              t.genero, c.nombre AS categoria, g.nombre AS grado_academico,
              t.antiguedad_unam, t.email_institucional,
              t.rfc, t.curp, t.telefono_casa, t.telefono_celular, t.direccion,
              t.antiguedad_carrera
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

      const [rows] = await db.query(sql, params);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Trabajadores');

      worksheet.columns = [
        { header: 'ID', key: 'id_trabajador', width: 10 },
        { header: 'Número de Trabajador', key: 'numero_trabajador', width: 20 },
        { header: 'Nombre Completo', key: 'nombre_completo', width: 30 },
        { header: 'Género', key: 'genero', width: 12 },
        { header: 'Categoría', key: 'categoria', width: 25 },
        { header: 'Grado Académico', key: 'grado_academico', width: 20 },
        { header: 'Antigüedad UNAM', key: 'antiguedad_unam', width: 15 },
        { header: 'Email Institucional', key: 'email_institucional', width: 30 },
        { header: 'RFC', key: 'rfc', width: 15 },
        { header: 'CURP', key: 'curp', width: 20 },
        { header: 'Teléfono Casa', key: 'telefono_casa', width: 15 },
        { header: 'Teléfono Celular', key: 'telefono_celular', width: 15 },
        { header: 'Dirección', key: 'direccion', width: 40 },
      ];

      rows.forEach(row => {
        row.genero = row.genero === 'M' ? 'Masculino' : row.genero === 'F' ? 'Femenino' : 'Otro';
        worksheet.addRow(row);
      });

      const headerRow = worksheet.getRow(1);
      headerRow.eachCell(cell => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
      headerRow.height = 20;

      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) {
          row.height = 18;
          row.eachCell(cell => {
            cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          });
        }
      });

      worksheet.views = [{ state: 'frozen', ySplit: 1 }];

      res.setHeader('Content-Disposition', 'attachment; filename=trabajadores.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error al exportar datos:', error);
      res.status(500).send('Error al generar el archivo Excel');
    }
  });


  module.exports = router;