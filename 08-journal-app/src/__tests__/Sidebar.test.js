import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Sidebar } from '../components/journal/Sidebar';
import { startLogout } from '../actions/auth';
import { startNewNote } from '../actions/notes';

jest.mock('../actions/auth', () => ({
  startLogout: jest.fn(),
}));

jest.mock('../actions/notes', () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: '1',
    name: 'Victor',
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: null,
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  </Provider>
);

describe('SideBar', () => {
  test('should render <SideBar/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call startLogout', () => {
    wrapper.find('button').prop('onClick')();

    expect(startLogout).toHaveBeenCalled();
  });

  test('should call startNewNote', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();
    expect(startNewNote).toHaveBeenCalled();
  });
});
