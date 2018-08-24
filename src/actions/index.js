import { API } from 'aws-amplify';
import * as type from './actionTypes';

//Action Creator
export function getPost(props) {
  return API.get('HitchedagramAPI', `/posts/${props.match.params.id}`);
}

export function getAll() {
  const response = API.get('HitchedagramAPI', '/all').then(r => Promise.all(r));
  console.log('getAll in actions index.js', response);
  return {
    type: type.FETCH_ALL,
    payload: response
  };
}

export const increaseTodo = () => {
  return {
    type: type.INCREASE
  };
};
export const updateTodo = wish_value => {
  return {
    type: type.UPDATE,
    wish_value: wish_value
  };
};

//Async Action Creator

// function fetchPostsWithRedux() {
//   return dispatch => {
//     dispatch(fetchPostsRequest());
//     return fetchPosts().then(([response, json]) => {
//       if (response.status === 200) {
//         dispatch(fetchPostsSuccess(json));
//       } else {
//         dispatch(fetchPostsError());
//       }
//     });
//   };
// }

// function fetchPosts() {
//   return API.get('HitchedagramAPI', '/all').then(response =>
//     Promise.all([response, response.json()])
//   );
// }
