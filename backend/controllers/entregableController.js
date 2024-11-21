const Entregable = require('../models/entregable');
const redis = require('redis');
const { promisify } = require('util');
require('dotenv').config();

// Configurar Redis
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

// Manejo de errores
redisClient.on('error', (err) => {
    console.error('Error conectando a Redis:', err);
});

const pushToQueue = promisify(redisClient.rpush).bind(redisClient);
// Crear un entregable
exports.createEntregable = async (req, res) => {
    try {
        const { estudianteId, correoEstudiante, proyectoId, nombreEntregable } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'Se requiere un archivo PDF' });
        }

        // Datos para Redis
        const taskData = {
            estudianteId,
            correoEstudiante,
            proyectoId,
            nombreEntregable,
            archivoPath:  `/uploads/${req.file.filename}`, // Ruta del archivo temporal
            archivoNombre: req.file.filename,
        };

        await nuevoEntregable.save();
        res.status(201).json(nuevoEntregable);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el entregable', details: error.message });
    }
};

// Obtener todos los entregables
exports.getEntregables = async (req, res) => {
    try {
        const entregables = await Entregable.find().populate('estudianteId proyectoId');
        res.status(200).json(entregables);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los entregables', details: error.message });
    }
};

// Obtener un entregable por ID
exports.getEntregableById = async (req, res) => {
    try {
        const entregable = await Entregable.findById(req.params.id).populate('estudianteId proyectoId');
        if (!entregable) {
            return res.status(404).json({ error: 'Entregable no encontrado' });
        }
        res.status(200).json(entregable);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el entregable', details: error.message });
    }
};
