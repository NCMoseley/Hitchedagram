import { combineReducers } from 'redux';
import postsReducer from '../actions/getPosts';
import allPostsReducer from '../actions/getAll';
import countReducer from './countReducer';

export default combineReducers({
  countReducer,
  postsReducer,
  allPostsReducer
});
