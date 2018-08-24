import { API } from 'aws-amplify';
import * as type from './actionTypes';

//Action Creator
export function getPost(props) {
  return API.get('HitchedagramAPI', `/posts/${props.match.params.id}`);
}

// export function getAll() {
//   const response = API.get('HitchedagramAPI', '/all').then(r => Promise.all(r));
//   console.log('getAll in actions index.js', response);
//   return {
//     type: type.FETCH_ALL,
//     payload: response
//   };
// }

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
