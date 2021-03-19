import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';

import { HeroScreen } from './../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router';

describe('HeroScreen', () => {
  const history = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test('should render <HeroScreen/> component or to redirect if no arguments in the URL', () => {
    const wrapper = mount(
      // initialEntries nos permite indicar una ruta inicial sobre la que hacer el test
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={history} />
      </MemoryRouter>
    );

    // expect(wrapper).toMatchSnapshot();

    //Si no existe el argumento en el URL; muestre el componente Redirect
    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  test('should draw a hero if param is received', () => {
    const wrapper = mount(
      // initialEntries nos permite indicar una ruta inicial sobre la que hacer el test
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        {/* Indicamos el componente que se renderiza en esa ruta */}
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );

    // Geenere uno de los divs para confirmar que dibuja el componente
    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('should return the previous screen with PUSH', () => {
    const history = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();

    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test('should return the previous screen with GoBACK', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();

    expect(history.push).toHaveBeenCalledTimes(0);
    expect(history.goBack).toHaveBeenCalled();
  });

  test('should call Redirect if hero does not exist', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider123123123']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe('');
  });
});
