import { API } from 'aws-amplify';

// Actions
import { FETCH_ALL } from '../actionTypes';

//Action Creators

const getAllPosts = posts => ({ type: FETCH_ALL, payload: posts });

export function fetchAll() {
  const request = API.get('HitchedagramAPI', '/all');
  console.log('fetchAll home redux module', request);
  return {
    type: FETCH_ALL,
    payload: request
  };
}

//Reducer

export default (
  state = {
    posts: [],
    error: ''
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL: {
      return { ...state, error: '' };
    }
    default:
      return state;
  }
};
