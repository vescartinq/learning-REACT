import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const LoginScreen = () => {
  const { setUser } = useContext(UserContext);

  let user = {
    id: 123,
    name: 'Victor',
  };

  return (
    <div>
      <h1>LoginScreen</h1>
      <hr />
      <button className="btn btn-primary" onClick={() => setUser(user)}>
        Login
      </button>
    </div>
  );
};
