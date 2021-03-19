import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import { PrivateRoute } from './../routers/PrivateRoute';

describe('PrivateRoute', () => {
  // Mock de localSgtorage
  Storage.prototype.setItem = jest.fn(() => {});

  const props = {
    location: {
      pathname: '/marvel',
    },
  };

  test('should render <PrivateRoute/> component if user is authenticated and save localStorage', () => {
    //mount para renderizar info padres e hijos, shallow para renderizar solo padres
    const wrapper = mount(
      // MemoryRouter es una función de react-router para falsear rutas
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <p>Test</p>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('p').exists()).toBe(true);
    // Probamos la memoria grabada en localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
  });

  test('should block component if user is not authenticated', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <p>Test</p>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('p').exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
  });
});
