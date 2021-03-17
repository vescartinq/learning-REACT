import React from 'react';
import { shallow } from 'enzyme';
import { TodoList } from '../../../components/08-useReducer/TodoList';
import { demoTodos } from '../../testHelper/demoTodos';

describe('Tests in <TodoList />', () => {
  const handleDelete = jest.fn();
  const handleToggle = jest.fn();

  const wrapper = shallow(
    <TodoList
      todos={demoTodos}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  );

  test('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should have <TodoListItem /> for every item of TODOS', () => {
    expect(wrapper.find('TodoListItem').length).toBe(demoTodos.length);

    expect(wrapper.find('TodoListItem').at(0).prop('handleDelete')).toEqual(
      expect.any(Function)
    );
  });
});
