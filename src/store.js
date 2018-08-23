import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index';
import async from './middlewares/async.js';

const initialState = { CountReducer: { count: 123, wish_value: 12 } };

// strange syntax used to allow initialState call

const createFinalStore = compose(applyMiddleware(async))(createStore);

const store = createFinalStore(reducer, initialState);

export default store;
