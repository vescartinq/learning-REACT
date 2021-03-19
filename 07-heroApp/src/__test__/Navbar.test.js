import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { AuthContext } from '../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router';

import { Navbar } from '../components/ui/Navbar';
import { types } from '../types/types';

describe('Navbar', () => {
  // Pruebas de history, debemos incluirlo en el test en Router como props
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'Victor',
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('should render <Navbar/> component', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Victor');
  });

  test('should call logout and use history', () => {
    wrapper.find('button').prop('onClick')();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  });
});
