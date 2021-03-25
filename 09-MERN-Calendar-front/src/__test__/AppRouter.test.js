// Añadimos process.env.NODE_ENV !== 'test' en CalendarModal, para evitar error del modal en #root
import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { AppRouter } from '../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// let store = mockStore(initState);
// store.dispatch = jest.fn();

describe('AppRouter', () => {
  test('should show Please, Wait...', () => {
    //   Simulamos el estado inicial en checkeando
    const initState = {
      auth: {
        checking: true,
      },
    };

    // Generamos estado
    const store = mockStore(initState);

    // Montamos componente
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    // Espero que se renderice h5 con el mensaje Please, Wait...
    // expect( wrapper ).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBe(true);
  });

  test('should render <AppRouter/> component with public route', () => {
    //   Estado inicial cuando ha acabado el checking sin encontrar usuario
    const initState = {
      auth: {
        checking: false,
        uid: null,
      },
    };

    //   Generamos store
    const store = mockStore(initState);

    //   Renderizamos componente
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    //   Espero ver la página de login
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('should render <AppRouter/> component with private route', () => {
    //   Estado inicial con usuario logeado y sin introducir evento ni recibir de backend

    const initState = {
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: false,
      },
      auth: {
        checking: false,
        uid: '123',
        name: 'esther',
      },
    };

    //   Generamos store
    const store = mockStore(initState);

    //   Renderizamos componente
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    //   Espero ver la página de login
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
