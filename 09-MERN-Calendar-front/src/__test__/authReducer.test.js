import { authReducer } from '../reducers/authReducer';
import { types } from '../types/types';

const initState = {
  checking: true,
  // uid: null,
  // name: null
};

describe('Testing authReducer', () => {
  test('should return default state', () => {
    const action = {};
    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });

  test('should authenticate user', () => {
    //   Generamos la acción de logear
    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Victor',
      },
    };

    // Guardamos el estado
    const state = authReducer(initState, action);

    // Espero que el nuevo estado sea con el usuario checkeado y logeado
    expect(state).toEqual({ checking: false, uid: '123', name: 'Victor' });
  });
});
