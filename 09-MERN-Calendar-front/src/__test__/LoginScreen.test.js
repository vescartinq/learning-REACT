import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Swal from 'sweetalert2';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLogin, startRegister } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';

jest.mock('./../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

// Mockeamos la acción de disparar el mensaje
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('Testing LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render <LoginScreen/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call dispatch when login', () => {
    //   Simulamos que se introduce el email para logearse
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'albert@gmail.com',
      },
    });

    //   Simulamos que se introduce el password para logearse
    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456',
      },
    });

    //   Simulamos que se clicka el boton para logearse
    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault() {},
    });

    // Espero que se ejecute la acción de logearse con los datos introducidos
    expect(startLogin).toHaveBeenCalledWith('albert@gmail.com', '123456');
  });

  test('should not register new user if passwords are different', () => {
    //   Simulamos que se introduce el password1 para registrarse
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });

    //   Simulamos que se introduce el password2 para registrarse
    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '1234567',
      },
    });

    //   Simulamos que se clicka el boton para registrarse
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });

    // Espero que no se ejecute la acción de registarsese con los datos introducidos
    expect(startRegister).not.toHaveBeenCalled();
    // Espero que se ejecute el mensaje de error con sweet-alert-2
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Las contraseñas deben de ser iguales',
      'error'
    );
  });

  test('should register new user if passwords are equals', () => {
    //   Simulamos que se introduce el Nombre para registrarse
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rName',
        value: 'Albert',
      },
    });

    //   Simulamos que se introduce el emaild1 para registrarse
    wrapper.find('input[name="rEmail"]').simulate('change', {
      target: {
        name: 'rEmail',
        value: 'albert@gmail.com',
      },
    });

    //   Simulamos que se introduce el password1 para registrarse
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: 'hola mundo',
      },
    });

    //   Simulamos que se introduce el password2 para registrarse
    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: 'hola mundo',
      },
    });

    //   Simulamos que se clicka el boton para registrarse
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });

    // Espero que no se ejecute el mensaje de error con sweet-alert-2
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith(
      'albert@gmail.com',
      'hola mundo',
      'Albert'
    );
  });
});
