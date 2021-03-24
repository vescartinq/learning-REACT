const express = require('express');
require('dotenv').config(); // configurador de variables de entorno
const cors = require('cors');

// Crear el servidor de express
const app = express();

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Directorio Público
app.use(express.static('public'));

// Rutas
app.use('/api/auth', require('./routes/authRoute'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
