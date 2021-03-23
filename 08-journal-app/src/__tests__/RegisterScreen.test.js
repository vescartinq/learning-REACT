import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { types } from '../types/types';
import { RegisterScreen } from '../components/auth/RegisterScreen';

// jest.mock('../actions/auth', () => ({
//   startGoogleLogin: jest.fn(),
//   startLoginEmailPassword: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
// store.dispatch = jest.fn(); // Todas las funciones del RegisterScreen son síncronas

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('RegisterScreen', () => {
  test('should render <RegisterScreen/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch actions', () => {
    const emailField = wrapper.find('input[name="email"]'); //input with name email

    // Usando el customHook
    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    const actions = store.getActions(); //No utilizamos store.dispatch=jest.fn() porque son funciones síncronas

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid',
    });
  });

  test('should dispatch error alert box', () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email not valid',
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      initState.ui.msgError
    );
  });
});
