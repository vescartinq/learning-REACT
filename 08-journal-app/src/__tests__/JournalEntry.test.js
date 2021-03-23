import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { activeNote } from '../actions/notes';
import { JournalEntry } from '../components/journal/JournalEntry';

// jest.mock('../actions/notes', () => ({
//   activeNote: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: 10,
  date: 0,
  title: 'Hola',
  body: 'Mundo',
  url: 'https://algunafoto.com/foto.jpg',
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
);

describe('JournalEntry', () => {
  test('should render <JournalEntry/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should activate note', () => {
    wrapper.find('.journal__entry').prop('onClick')();

    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, { ...note })
    );
  });
});
