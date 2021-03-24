/*
    Rutas de Usuarios-> / Auth
    host + /api/auth
*/
const { Router } = require('express');
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require('../controllers/authController');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
  });
});

router.post('/', loginUsuario);

router.post('/new', crearUsuario);

router.get('/renew', revalidarToken);

module.exports = router;
