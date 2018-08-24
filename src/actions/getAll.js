import { API, Storage } from 'aws-amplify';
import * as type from '../actions/actionTypes';

// Action Creators
const getAllSuccess = posts => ({
  type: type.GET_ALL_SUCCESS,
  payload: posts
});
const getAllError = error => ({
  type: type.GET_ALL_FAILURE,
  payload: error
});

// Async Action Creator
export function getAll() {
  return async function action(dispatch) {
    dispatch({ type: type.GET_ALL_SUCCESS });
    try {
      const request = await API.get('HitchedagramAPI', '/all').then(r => {
        return r;
      });
      // console.log('getAll in actions/getAll.js', request);
      const posts = request;
      const postsWithImages = await Promise.all(
        posts.map(async post => {
          const image = await getImage(post.attachment);
          return { ...post, image };
        })
      );
      dispatch(getAllSuccess(postsWithImages));
    } catch (e) {
      alert(e);
      dispatch(getAllError(e));
    }
  };
}

async function getImage(attachment) {
  const image = await Storage.get(attachment);
  return image;
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
