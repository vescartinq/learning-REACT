import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import '@testing-library/jest-dom';
import { CalendarModal } from '../../components/calendar/CalendarModal';
import {
  eventStartUpdate,
  eventClearActiveEvent,
  eventStartAddNew,
} from '../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

// Estado inicial creando un evento para activar el modal
const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola Mundo',
      notes: 'Algunas notas',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: '123',
    name: 'Victor',
  },
  //   Modal abierto
  ui: {
    modalOpen: true,
  },
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Testing <CalendarModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render CalendarModal', () => {
    //   Espero que al estar activado el modal, la propiedas isOpen exista
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('should call update and close modal', () => {
    //   Simulamos el envio de formulario del modal
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    // Espero que se cree el evento en el calendario
    expect(eventStartUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    // Espero que se limpie el modal
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should return error if title does not exist', () => {
    //   Simulamos el envio de formulario del modal
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    //   Esperi que me muestre la clase invalid del input title
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
      true
    );
  });

  test('should create an event', () => {
    // Estado inicial con modal abierto
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: '123',
        name: 'Victor',
      },
      ui: {
        modalOpen: true,
      },
    };

    //   Reseteamos store y componente (A REFACTORIZAR)
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    //   Simulamos entrada titulo
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas',
      },
    });

    //   Simulamos envio formulario
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    //   Espero que el inicio de nuevo evento sea creado
    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hola pruebas',
      notes: '',
    });

    //   Espero que se limpie el modal
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should validate dates', () => {
    //   Simulamos introducir una modificación del titulo
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas',
      },
    });

    const hoy = new Date();

    // Actuamos sobre la caja de fechas fin [1] y la ponemos anterior a la fecha inicio (con const hoy a la fecha del momento inmediato)
    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
    });

    // Simulamos el envio de formulario
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    // Espero que me devuelva error
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'La fecha fin debe de ser mayor a la fecha de inicio',
      'error'
    );
  });
});
