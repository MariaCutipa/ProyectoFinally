const mongoose = require('mongoose');

const entregableSchema = new mongoose.Schema({
    estudianteId: { type: String, required: true },
    correoEstudiante: { type: String, required: true },
    proyectoId: { type: String, required: true },
    nombreEntregable: { type: String, required: true }, // Ej: "Entregable 1", "Entregable 2"
    fechaSubida: { type: Date, default: Date.now },
    archivoUrl: { type: String, required: true }, // URL o path del archivo
});

module.exports = mongoose.model('Entregable', entregableSchema);
