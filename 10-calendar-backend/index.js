const express = require('express');
require('dotenv').config();
const cors = require('cors');

// Crear el servidor de express
const app = express();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
  });
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
