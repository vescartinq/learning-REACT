import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { firebase } from '../firebase/firebase-config';

import { login } from '../actions/auth';
import { AppRouter } from '../routers/AppRouter';

jest.mock('./../actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 'ABC',
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Testing <AppRouter /> component', () => {
  test('should call login if user is authenticated', async () => {
    let user;

    // ACT gestiona el cambio asíncrono de autenticación cuando recibe la info de firebase
    await act(async () => {
      // Autenticamos al usuario
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword('test@testing.com', '123456');
      user = userCredentials.user;

      //   renderizamos el component
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    // confirmamos que el usuario se ha logeado
    expect(login).toHaveBeenCalledWith('7JqprtF85GcvAeqNl3aQTU8jP163', null);
  });
});
