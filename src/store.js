import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import async from './middlewares/async.js';

const initialState = {
  countReducer: { count: 123, wish_value: 12 }
};

const store = createStore((reducers, initialState), applyMiddleware(async));

export default store;
