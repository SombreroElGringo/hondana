import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducer from './reducers/app';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  app: appReducer,
});

const middlewares = [
  thunk,
  store => next => action => {
    console.log(action.type);
    return next(action);
  },
];

const enhancer = applyMiddleware(...middlewares);

const store = createStore(reducer, enhancer);

export default store;
