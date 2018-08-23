import { combineReducers } from 'redux';
import auth from './auth';
import postsReducer from '../store/modules/home';
import CountReducer from '../reducers/CountReducer';

export default combineReducers({
  auth,
  CountReducer,
  posts: postsReducer
});
