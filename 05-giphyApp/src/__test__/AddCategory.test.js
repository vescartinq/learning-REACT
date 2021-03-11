import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { AddCategory } from './../components/AddCategory';

describe('AddCategory', () => {
  let wrapper;
  //   const setCategories = ()=>{}
  const setCategories = jest.fn(); //mockeamos la función para que no importe el resultado

  beforeEach(() => {
    jest.clearAllMocks(); //reseteamos los mocks
    wrapper = shallow(<AddCategory setCategories={setCategories} />); //reseteamos el componente
  });

  test('should render AddCategory component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should change input box', () => {
    const input = wrapper.find('input');
    const value = 'Messi';

    input.simulate('change', { target: { value } }); //en las pruebas no es necesario onChange, solo change
  }); // e.target.value='Messi'

  test('should not post info when onSubmit', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} }); //simulamos el evento submit

    expect(setCategories).not.toHaveBeenCalled();
  });
});
