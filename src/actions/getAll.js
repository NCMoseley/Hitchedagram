import { API } from 'aws-amplify';
import * as type from '../actions/actionTypes';

// Action Creators
const getPostsSuccess = posts => ({
  type: type.GET_ALL_SUCCESS,
  payload: posts
});
const getPostsError = error => ({
  type: type.GET_ALL_FAILURE,
  payload: error
});

// Async Action Creator
export function getPosts() {
  return function action(dispatch) {
    dispatch({ type: type.GET_ALL_SUCCESS });
    const request = API.get('HitchedagramAPI', '/all');
    console.log('getAll in actions/getAll.js', request);
    return request.then(
      response => dispatch(getPostsSuccess(response)),
      err => dispatch(getPostsError(err))
    );
  };
}

//Reducer

export default (
  state = {
    posts: []
  },
  action
) => {
  switch (action.type) {
    case 'GET_ALL_SUCCESS': {
      return { ...state, posts: action.payload };
    }
    case 'GET_ALL_FAILURE': {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
