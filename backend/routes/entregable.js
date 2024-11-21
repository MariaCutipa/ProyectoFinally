const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const entregableController = require('../controllers/entregableController');

// Crear un nuevo entregable
router.post('/', upload.single('archivo'), entregableController.createEntregable);

// Obtener todos los entregables
router.get('/', entregableController.getEntregables);

// Obtener un entregable por ID
router.get('/:id', entregableController.getEntregableById);

module.exports = router;
