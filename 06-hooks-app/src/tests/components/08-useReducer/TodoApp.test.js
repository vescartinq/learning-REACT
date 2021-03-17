import React from 'react';
import { shallow, mount } from 'enzyme';
import { TodoApp } from '../../../components/08-useReducer/TodoApp';
import { demoTodos } from '../../testHelper/demoTodos';
import { act } from '@testing-library/react';

describe('Tests in <TodoApp />', () => {
  const wrapper = shallow(<TodoApp />);

  // Mock de localSgtorage
  Storage.prototype.setItem = jest.fn(() => {});

  test('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de agregar un TODO', () => {
    // Mount vuelve a renderizar el componente para ver la aplicación con su contexto
    const wrapper = mount(<TodoApp />);

    // Al realizar un cambio una vez ya montado el componente, debemos usar ACT
    act(() => {
      // Agregamos todos
      wrapper.find('TodoAdd').prop('handleAddTodo')(demoTodos[0]);
      wrapper.find('TodoAdd').prop('handleAddTodo')(demoTodos[1]);
    });

    expect(wrapper.find('h1').text().trim()).toBe('TodoApp ( 2 )');
    // Probamos la memoria grabada en localStorage
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  test('should delete a todo item', () => {
    wrapper.find('TodoAdd').prop('handleAddTodo')(demoTodos[0]);
    wrapper.find('TodoList').prop('handleDelete')(demoTodos[0].id);

    expect(wrapper.find('h1').text().trim()).toBe('TodoApp ( 0 )');
  });
});
