import { API } from 'aws-amplify';
import * as type from './actionTypes';

//Action Creator
export function getPost(props) {
  return API.get('HitchedagramAPI', `/posts/${props.match.params.id}`);
}

export function getAll(props) {
  const request = API.get('HitchedagramAPI', '/all');
  console.log('getPost in actions index.js', request);
  return {
    type: type.FETCH_ALL,
    payload: request
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
