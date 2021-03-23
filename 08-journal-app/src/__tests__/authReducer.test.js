import { authReducer } from '../reducers/authReducer';
import { types } from '../types/types';

describe('Testing AuthReducer', () => {
  test('should login user', () => {
    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'Victor',
      },
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({
      uid: 'abc',
      name: 'Victor',
    });
  });

  test('should logout user', () => {
    const initState = {
      uid: 'abc',
      displayName: 'Victor',
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });

  test('should continue with user logged', () => {
    const initState = {
      uid: 'abc',
      displayName: 'Victor',
    };

    const action = {
      type: 'xxxxx',
    };

    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
