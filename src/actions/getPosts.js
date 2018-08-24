import { API } from 'aws-amplify';
import * as type from '../actions/actionTypes';
// Action Creators
const getPostsSuccess = posts => ({
  type: type.GET_POSTS_SUCCESS,
  payload: posts
});
const getPostsError = error => ({
  type: type.GET_POSTS_FAILURE,
  payload: error
});

// Async Action
export function getPosts() {
  console.log('getAll in actions/index.js');
  return function action(dispatch) {
    dispatch({ type: type.GET_POSTS });

    const request = API.get('HitchedagramAPI', '/posts');
    return request.then(
      response => dispatch(getPostsSuccess(response)),
      err => dispatch(getPostsError(err))
    );
  };
}
