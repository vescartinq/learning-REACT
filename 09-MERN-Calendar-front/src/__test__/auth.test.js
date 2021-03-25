import React from 'react';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLogin, startRegister, startChecking } from '../actions/auth';
import { types } from '../types/types';
import * as fetchModule from '../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let token = '';

describe('Testing auth actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('should do startLogin', async () => {
    //   Enviamos email y password
    await store.dispatch(startLogin('victor@gmail.com', '123456'));

    //  Realiza las acciones
    const actions = store.getActions();

    // Espero la autenticación del usuario
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    // Espero la generación del token
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    //  Espero la hora de inicio del token
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );

    // Recuperar los tokens con los que fueron realizadas las pruebas, dentro de la primera posición, el segundo parámetro
    token = localStorage.setItem.mock.calls[0][1];
    // console.log(localStorage.setItem.mock.calls[0][1])
  });

  test('Should return error with incorrect startLogin', async () => {
    //   Error en contraseña
    await store.dispatch(startLogin('victor@gmail.com', '123456789'));

    // Genera las acciones
    let actions = store.getActions();

    // Espero que no haga nada con un login incorrecto
    expect(actions).toEqual([]);
    // Espero la respuesta de Sweet-alert-2
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Password incorrecto',
      'error'
    );

    //  Error en email
    await store.dispatch(startLogin('victor@gmail2.com', '123456'));

    // Genera las acciones
    actions = store.getActions();

    // Espero la respuesta de Sweet-alert-2
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'El usuario no existe con ese email',
      'error'
    );
  });

  test('should do startRegister', async () => {
    // Mock de la fase de registro del fetchSinToken
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'esther',
          token: 'ABC123ABC123',
        };
      },
    }));

    // Ejecutamos el registro de usuario {email, password, nombre}
    await store.dispatch(startRegister('test2@test.com', '123456', 'test'));

    // Llamamos a las acciones
    const actions = store.getActions();

    // Espero que se ejecute el login
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'esther',
      },
    });

    // Confirmo que se graba en localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );
  });

  test('should do startChecking', async () => {
    // Mockeamos el usuario para poder recibir token
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'esther',
          token: 'ABC123ABC123',
        };
      },
    }));

    // Iniciamos el check
    await store.dispatch(startChecking());

    // Recibimos las acciones
    const actions = store.getActions();

    // Espero que se ejecute el login
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'esther',
      },
    });

    // Confirmo que se graba en localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123');
  });
});
