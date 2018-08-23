import { combineReducers } from 'redux';
import auth from './auth';
import postsReducer from '../store/modules/home';
import countReducer from '../reducers/CountReducer';

export default combineReducers({
  auth,
  countReducer,
  posts: postsReducer
});
