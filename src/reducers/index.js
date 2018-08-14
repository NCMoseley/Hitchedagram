import { combineReducers } from 'redux';
import auth from './auth';

export default combineReducers({
  auth
});

// import { reducer as formReducer } from "redux-form";
// import PostsReducer from './reducer_posts';

// const rootReducer = combineReducers({
//   posts: PostsReducer
//   // form: formReducer
// });

// export default rootReducer;
