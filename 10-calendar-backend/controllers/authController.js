const { response } = require('express'); //No obligatorio, para poder utilizar intellisense

const crearUsuario = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'registro',
  });
};

const loginUsuario = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'login',
  });
};

const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
