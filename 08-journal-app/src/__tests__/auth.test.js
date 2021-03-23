import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from '../actions/auth';
import { types } from '../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store;

const initialState = {};

describe('Testing Auth.js', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('login y logout should create an action ', () => {
    const uid = 'ABC123';
    const displayName = 'Victor';

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test('should do startLogout', async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test('should do startLoginEmailPassword', async () => {
    await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

    const actions = store.getActions();
    // console.log(actions);w

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: '7JqprtF85GcvAeqNl3aQTU8jP163',
        displayName: null,
      },
    });
  });
});
