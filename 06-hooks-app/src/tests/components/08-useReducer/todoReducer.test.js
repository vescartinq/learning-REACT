import { todoReducer } from '../../../components/08-useReducer/todoReducer';
import { demoTodos } from '../../testHelper/demoTodos';

describe('Tests in todoReducer', () => {
  test('should return default state', () => {
    const state = todoReducer(demoTodos, {});
    expect(state).toEqual(demoTodos);
  });

  test('should add a TODO', () => {
    const newTodo = {
      id: 3,
      desc: 'Aprender Express',
      done: false,
    };

    const action = {
      type: 'add',
      payload: newTodo,
    };

    const state = todoReducer(demoTodos, action);

    expect(state.length).toBe(3); //demoTODO(2)+newTodo(1)
    expect(state).toEqual([...demoTodos, newTodo]);
  });

  test('should delete a TODO', () => {
    // action.payload = ID del TODO
    const action = {
      type: 'delete',
      payload: 1,
    };

    const state = todoReducer(demoTodos, action);

    expect(state.length).toBe(1);
    expect(state).toEqual([demoTodos[1]]);
  });

  test('should do TOOGLE in TODO', () => {
    const action = {
      type: 'toggle',
      payload: 1,
    };

    const state = todoReducer(demoTodos, action);

    expect(state[0].done).toBe(true);
    expect(state[1]).toEqual(demoTodos[1]);
  });
});
