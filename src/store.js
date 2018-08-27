import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const store = createStore(reducer, applyMiddleware(thunk));

// strange syntax used to allow initialState call
// const initialState = { likeReducer: { likes: 0, hasBeenLiked: false } };

// const createFinalStore = compose(applyMiddleware(thunk))(createStore);

// const store = createFinalStore(reducer, initialState);

export default store;
