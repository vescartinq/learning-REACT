import React from 'react';

export const LoginScreen = ({ history }) => {
  const handleLogin = () => {
    // history.push('/'); // redirecciona a la dirección que indiquemos
    history.replace('/'); // no visita el login, va directo al Dashboard
    // Lo utilizamos en esta App para redirect a /marvel
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
