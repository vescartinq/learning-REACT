import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';

import { SearchScreen } from '../components/search/SearchScreen';

describe('SearchScreen', () => {
  test('should render <SearchScreen/> component', () => {
    //   En la ruta search, se debe renderizar el componente Search
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
  });

  test('should draw Batman and input with the queryString value', () => {
    const wrapper = mount(
      // ruta cuando buscamos Batman
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper).toMatchSnapshot();
  });

  test('should send error if Hero not found', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('.alert-danger').text().trim()).toBe(
      `There is no a hero with batman123`
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should call push history', () => {
    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    // Simulamos el cambio en el error introduciendo un valor correcto en el input
    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: 'batman',
      },
    });

    // Ejecutamos el Submit -> enviando el evento
    wrapper.find('form').prop('onSubmit')({
      preventDefault() {},
    });

    expect(history.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
