const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Servidor backend en funcionamiento en el puerto: '+ port);
});

mongoose.connect('mongodb://0.0.0.0/mean_db', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

const entregableRoutes = require('./routes/entregable');

// Otras configuraciones...

app.use('/api/entregables', entregableRoutes);