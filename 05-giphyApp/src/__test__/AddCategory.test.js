import React from 'react';
// import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { AddCategory } from './../components/AddCategory';

describe('AddCategory', () => {
  let wrapper;
  const setCategories = () => {};

  beforeEach(() => {
    //   Title y URL son required en PropTypes

    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });

  test('should render AddCategory component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should change input box', () => {
    const input = wrapper.find('input');
    const value = 'Messi';

    input.simulate('change', { target: { value } }); //en las pruebas no es necesario onChange, solo change
  }); // e.target.value='Messi'
});
