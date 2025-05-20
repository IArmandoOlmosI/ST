const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const { isAuthenticated } = require('../auth');

// POST /tabla/importar-excel
router.post('/importar-excel', isAuthenticated, async (req, res) => {
    if (!req.session.user.isAdmin) {
        return res.status(403).json({ message: 'No autorizado' });
    }

    try {
        const { workers } = req.body;

        if (!workers || !Array.isArray(workers) || workers.length === 0) {
            return res.status(400).json({ message: 'No se recibieron datos válidos' });
        }

        // Obtener categorías y grados con insensibilidad a mayúsculas/minúsculas y espacios
        const { rows: categorias } = await db.query(
            'SELECT id_categoria, LOWER(TRIM(nombre)) as nombre_lower, nombre FROM categorias'
        );
        const { rows: grados } = await db.query(
            'SELECT id_grado, LOWER(TRIM(nombre)) as nombre_lower, nombre FROM grados_academicos'
        );

        const categoriasMap = categorias.reduce((map, cat) => {
            const key = cat.nombre_lower.replace(/\s+/g, ' ').trim();
            map[key] = cat.id_categoria;
            // Mapear sin acentos
            const keyWithoutAccents = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (keyWithoutAccents !== key) {
                map[keyWithoutAccents] = cat.id_categoria;
            }
            return map;
        }, {});

        const gradosMap = grados.reduce((map, grado) => {
            const key = grado.nombre_lower.replace(/\s+/g, ' ').trim();
            map[key] = grado.id_grado;
            // Mapear también sin acentos para mejor coincidencia
            const keyWithoutAccents = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (keyWithoutAccents !== key) {
                map[keyWithoutAccents] = grado.id_grado;
            }
            return map;
        }, {});

        let insertedCount = 0;
        let updatedCount = 0;
        let skippedCount = 0;
        const errors = [];

        // Usar transacción para mantener consistencia
        const client = await db.connect();
        
        try {
            await client.query('BEGIN');

            for (const [index, worker] of workers.entries()) {
                try {
                    if (!worker.numero_trabajador || !worker.nombre_completo) {
                        skippedCount++;
                        errors.push(`Fila ${index + 2}: Falta número de trabajador o nombre`);
                        continue;
                    }

                    // Procesar categoría
                    let id_categoria = null;
                    if (worker.categoria_nombre) {
                        const categoriaKey = worker.categoria_nombre.toLowerCase().trim().replace(/\s+/g, ' ');
                        const categoriaKeyWithoutAccents = categoriaKey.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        
                        id_categoria = categoriasMap[categoriaKey] || 
                                      categoriasMap[categoriaKeyWithoutAccents];
                    }

                    // Procesar grado académico
                    let id_grado = null;
                    if (worker.grado_academico_nombre) {
                        const gradoKey = worker.grado_academico_nombre.toLowerCase().trim().replace(/\s+/g, ' ');
                        const gradoKeyWithoutAccents = gradoKey.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        
                        id_grado = gradosMap[gradoKey] || 
                                  gradosMap[gradoKeyWithoutAccents];
                    }

                    // Verificar si el trabajador ya existe
                    const { rows: existingWorker } = await client.query(
                        'SELECT id_trabajador FROM trabajadores WHERE numero_trabajador = $1',
                        [worker.numero_trabajador]
                    );

                    if (existingWorker.length > 0) {
                        // Actualizar registro existente
                        await client.query(
                            `UPDATE trabajadores SET 
                                nombre_completo = $1,
                                genero = $2,
                                id_categoria = $3,
                                id_grado = $4,
                                antiguedad_unam = $5,
                                email_institucional = $6,
                                rfc = $7,
                                curp = $8,
                                telefono_casa = $9,
                                telefono_celular = $10,
                                direccion = $11,
                                antiguedad_carrera = $12,
                                updated_at = CURRENT_TIMESTAMP
                            WHERE numero_trabajador = $13`,
                            [
                                worker.nombre_completo,
                                worker.genero || null,
                                id_categoria,
                                id_grado,
                                worker.antiguedad_unam || 0,
                                worker.email_institucional || null,
                                worker.rfc || null,
                                worker.curp || null,
                                worker.telefono_casa || null,
                                worker.telefono_celular || null,
                                worker.direccion || null,
                                worker.antiguedad_carrera || 0,
                                worker.numero_trabajador
                            ]
                        );
                        updatedCount++;
                    } else {
                        // Insertar nuevo registro
                        await client.query(
                            `INSERT INTO trabajadores (
                                numero_trabajador, nombre_completo, genero, id_categoria, id_grado,
                                antiguedad_unam, email_institucional, rfc, curp,
                                telefono_casa, telefono_celular, direccion, antiguedad_carrera
                            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                            [
                                worker.numero_trabajador,
                                worker.nombre_completo,
                                worker.genero || null,
                                id_categoria,
                                id_grado,
                                worker.antiguedad_unam || 0,
                                worker.email_institucional || null,
                                worker.rfc || null,
                                worker.curp || null,
                                worker.telefono_casa || null,
                                worker.telefono_celular || null,
                                worker.direccion || null,
                                worker.antiguedad_carrera || 0
                            ]
                        );
                        insertedCount++;
                    }
                } catch (error) {
                    console.error(`Error procesando fila ${index + 2}:`, error);
                    errors.push(`Fila ${index + 2}: ${error.message}`);
                    skippedCount++;
                }
            }

            await client.query('COMMIT');
            
            const response = {
                success: true,
                message: `Importación completada. ${insertedCount} nuevos, ${updatedCount} actualizados, ${skippedCount} omitidos.`,
                insertedCount,
                updatedCount,
                skippedCount
            };

            if (errors.length > 0) {
                response.errors = errors.slice(0, 10); // Limitar a 10 errores para no saturar
                if (errors.length > 10) {
                    response.message += ` (mostrando 10 de ${errors.length} errores)`;
                }
            }

            res.json(response);

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error al importar Excel:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al procesar el archivo: ' + error.message 
        });
    }
});

module.exports = router;