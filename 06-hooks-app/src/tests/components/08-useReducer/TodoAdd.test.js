import React from 'react';
import { shallow } from 'enzyme';
import { TodoAdd } from '../../../components/08-useReducer/TodoAdd';

describe('Tests in <TodoAdd />', () => {
  const handleAddTodo = jest.fn();

  const wrapper = shallow(<TodoAdd handleAddTodo={handleAddTodo} />);

  test('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should NOT call handleAddTodo', () => {
    //simular el SUBMIT sin ningun valor
    const formSubmit = wrapper.find('form').prop('onSubmit');
    formSubmit({ preventDefault() {} });

    expect(handleAddTodo).toHaveBeenCalledTimes(0);
  });

  test('should call handleAddTodo', () => {
    const value = 'Aprender Firestore';

    // Cambio en el valor del INPUT
    wrapper.find('input').simulate('change', {
      target: {
        value,
        name: 'description',
      },
    });

    //simular el SUBMIT con nuevo valor
    const formSubmit = wrapper.find('form').prop('onSubmit');
    formSubmit({ preventDefault() {} });

    expect(handleAddTodo).toHaveBeenCalledTimes(1);
    expect(handleAddTodo).toHaveBeenCalledWith(expect.any(Object)); // { }
    expect(handleAddTodo).toHaveBeenCalledWith({
      id: expect.any(Number),
      desc: value,
      done: false,
    });
    // input debe volver a estar reseteado
    expect(wrapper.find('input').prop('value')).toBe('');
  });
});
