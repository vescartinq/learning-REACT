import { actionTypes } from '../types/actionTypes';

// const state = {
//     name: 'Victor',
//     logged: true
// }

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...action.payload,
        logged: true,
      };

    case actionTypes.LOGOUT:
      return {
        logged: false,
      };

    default:
      return state;
  }
};
