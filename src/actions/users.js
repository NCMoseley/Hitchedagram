import { API } from 'aws-amplify';
import * as type from './actionTypes';

// Action Creators
const createUserSuccess = response => ({
  type: type.CREATE_USER_SUCCESS,
  payload: response
});
const createUserFailure = error => ({
  type: type.CREATE_USER_FAILURE,
  payload: error
});
export const createUserInStore = newUser => ({
  type: type.CREATE_USER_IN_STORE,
  payload: newUser
});

// Async Action Creator
export function createUser(newUser) {
  return async function action(dispatch) {
    dispatch({ type: type.CREATE_USER });
    try {
      console.log('createUser in actions/users.js');
      const request = await API.post('HitchedagramAPI', '/users', {
        body: {
          ownerEmail: newUser.ownerEmail,
          ownerName: newUser.ownerName
        }
      });
      console.log('createUser in actions/users.js', request);
      dispatch(getUsers());
    } catch (e) {
      alert(e);
      dispatch(createUserFailure(e));
    }
  };
}

export function getUsers() {
  return async function action(dispatch) {
    dispatch({ type: type.GET_ALL_SUCCESS });
    try {
      const request = await API.get('HitchedagramAPI', '/usersAll').then(r => {
        return r;
      });
      console.log('getUsers in actions/users.js', request);
      dispatch(createUserSuccess(request));
    } catch (e) {
      alert(e);
      dispatch(createUserFailure(e));
    }
  };
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_USER_IN_STORE': {
      return {
        ...state,
        newUser: action.payload
      };
    }
    case 'CREATE_USER_SUCCESS': {
      return {
        ...state,
        dbUsers: action.payload
      };
    }
    case 'CREATE_USER_FAILURE': {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
