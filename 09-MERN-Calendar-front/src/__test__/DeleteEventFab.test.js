import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { eventStartDelete } from '../actions/events';
import { DeleteEventFab } from '../components/ui/DeleteEventFab';

jest.mock('./../actions/events.js', () => ({
  eventStartDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <DeleteEventFab />
    </MemoryRouter>
  </Provider>
);

describe('DeleteEventFab', () => {
  test('should render <DeleteEventFab/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call eventStartDelete when click the button', () => {
    wrapper.find('button').prop('onClick')();

    expect(eventStartDelete).toHaveBeenCalled();
  });
});
