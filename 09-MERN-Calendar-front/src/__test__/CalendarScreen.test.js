import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';

import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { messages } from '../helpers/calendar-messages-es';
import { eventSetActive } from '../actions/events';
import { types } from '../types/types';

// Mockeamos los eventos
jest.mock('../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Estado inicial con user, modal cerrado, y backend vacio
const initState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: '123',
    name: 'Victor',
  },
  ui: {
    openModal: false,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe('Testing CalendarScreen', () => {
  test('should render <CalendarScreen/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should prove actions on calendar', () => {
    // Seleccionamos el calendario
    const calendar = wrapper.find('Calendar');

    // Seleccionamos la propiedad messages del calendario
    const calendarMessages = calendar.prop('messages');
    // Espero que la propiedas messages del calendario me muestre los mensajes del Helper
    expect(calendarMessages).toEqual(messages);

    calendar.prop('onDoubleClickEvent')();
    // Espero que al clickar dos veces en el calendario, se abra el modal
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop('onSelectEvent')({ start: 'Hola' });
    // Espero que al clickar en el evento seleccionado, se abra ese evento
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hola' });

    // Actuando desde la vista Semanal
    act(() => {
      calendar.prop('onView')('week');
      //   Espero que se quede grabada en localStorage
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    });
  });
});
