// import axios from 'axios';
import { API } from 'aws-amplify';
// import { API, Storage } from 'aws-amplify';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

export function getPost(props) {
  return API.get('posts', `/posts/${props.match.params.id}`);
}

// export function getPost(props) {
//   const request = API.get('posts', `/posts/${props.match.params.id}`);
//   console.log('getPost in actions index.js', request);
//   return {
//     type: FETCH_POSTS,
//     payload: request
//   };
// }

// From Blog-Redux project Note:

// export function createPost(values, callback) {
//   const request = axios
//     .post(`${ROOT_URL}/posts${API_KEY}`, values)
//     // this callback handles the race condition that is created when the post is submitted and the user is navigated back to the index page.
//     .then(() => callback());
//   return {
//     type: CREATE_POST,
//     payload: request
//   };
// }

// export function fetchPost(id) {
//   const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
//   return {
//     type: FETCH_POST,
//     payload: request
//   };
// }

// export function deletePost(id, callback) {
//   const request = axios
//     .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
//     .then(() => callback());
//   return {
//     type: DELETE_POST,
//     payload: id
//   };
// }
