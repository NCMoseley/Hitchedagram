import { combineReducers } from 'redux';
import postsReducer from '../actions/getPosts';
import allPostsReducer from '../actions/getAll';
import likeReducer from '../actions/likes';
import usersReducer from '../actions/users';

export default combineReducers({
  likeReducer,
  postsReducer,
  allPostsReducer,
  usersReducer
});
