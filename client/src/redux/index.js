import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducer from './reducers/app';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = combineReducers({
  app: appReducer,
});

const logger = createLogger({
  duration: true,
  diff: true,
});

const middlewares = [thunk, logger];

const enhancer = applyMiddleware(...middlewares);

const store = createStore(reducer, enhancer);

export default store;
