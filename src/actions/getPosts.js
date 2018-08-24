import { API, Storage } from 'aws-amplify';
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

// Async Action Creator
export function getPosts() {
  return async function action(dispatch) {
    dispatch({ type: type.GET_POSTS_SUCCESS });
    try {
      const request = await API.get('HitchedagramAPI', '/posts').then(r => {
        return r;
      });
      // console.log('getPosts in actions/getPosts.js', request);
      const posts = request;
      const postsWithImages = await Promise.all(
        posts.map(async post => {
          const image = await getImage(post.attachment);
          return { ...post, image };
        })
      );
      dispatch(getPostsSuccess(postsWithImages));
    } catch (e) {
      alert(e);
      dispatch(getPostsError(e));
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
    case 'GET_POSTS_SUCCESS': {
      return { ...state, posts: action.payload };
    }
    case 'GET_POSTS_FAILURE': {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
