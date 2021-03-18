import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { actionTypes } from '../../types/actionTypes';

export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {
    // recupera la última ubicación despues de loggout -> lastPath debe ser igual que el indicado en PrivateRoute.js
    const lastPath = localStorage.getItem('lastPath') || '/';

    dispatch({
      type: actionTypes.LOGIN,
      payload: {
        name: 'Victor',
      },
    });

    history.replace(lastPath);
    // history.push('/'); // redirecciona a la dirección que indiquemos
    // history.replace('/'); // no visita el login, va directo al Dashboard
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
