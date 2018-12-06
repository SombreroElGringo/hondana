import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducer from './reducers/app';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = combineReducers({
  app: appReducer,
});

const logger = createLogger({
  duration: true,
});

const middlewares = [
  thunk,
  //logger,
  store => next => action => {
    console.log(action.type);
    return next(action);
  },
];

const enhancer = applyMiddleware(...middlewares);

const store = createStore(reducer, enhancer);

export default store;
