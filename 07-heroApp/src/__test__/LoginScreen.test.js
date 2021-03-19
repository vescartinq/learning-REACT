import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { LoginScreen } from '../components/login/LoginScreen';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

describe('LoginScreen', () => {
  const history = {
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={history} />
    </AuthContext.Provider>
  );

  test('should render <LoginScreen/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should execute dispatch and navigation', () => {
    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();

    // Dispara el dispatch para hacer LogIn
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: 'Victor',
      },
    });

    // Redirecciona al hacer click
    expect(history.replace).toHaveBeenCalledWith('/');

    // Redirecciona a la página almacenada como última visita
    localStorage.setItem('lastPath', '/dc');
    handleClick();
    expect(history.replace).toHaveBeenCalledWith('/dc');
  });
});
