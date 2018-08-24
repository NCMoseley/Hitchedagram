import { combineReducers } from 'redux';
import postsReducer from '../actions/getPosts';
import allPostsReducer from '../actions/getAll';
import likeReducer from '../actions/likes';

export default combineReducers({
  likeReducer,
  postsReducer,
  allPostsReducer
});
