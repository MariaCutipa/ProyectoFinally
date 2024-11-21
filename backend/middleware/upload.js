const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para archivos PDF
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Carpeta de destino
    },
    filename: (req, file, cb) => {
        // Extraer la extensión del archivo original
        const ext = path.extname(file.originalname);
        // Crear un nombre único para el archivo usando la fecha actual
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Usar el nombre único y la extensión
        cb(null, uniqueName + ext);
    }
});

// Filtro para aceptar solo PDFs
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo: 5 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true); // Aceptar el archivo
        } else {
            cb(new Error('Solo se permiten archivos PDF'), false); // Rechazar archivos no-PDF
        }
    }
});

module.exports = upload;
