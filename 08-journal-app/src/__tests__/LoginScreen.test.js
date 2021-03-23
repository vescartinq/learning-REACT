import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startGoogleLogin, startLoginEmailPassword } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';

jest.mock('../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

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
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe('LoginScreen', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('should render <LoginScreen/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch startGoogleLogin', () => {
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('should dispatch startLogin', () => {
    wrapper.find('form').prop('onSubmit')({
      preventDefault() {},
    });

    expect(startLoginEmailPassword).toHaveBeenLastCalledWith('', '');
  });
});
