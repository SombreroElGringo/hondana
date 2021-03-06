import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducer from './reducers/app';
import authReducer from './reducers/auth';
import authorsReducer from './reducers/authors';
import bookcasesReducer from './reducers/bookcases';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  authors: authorsReducer,
  bookcases: bookcasesReducer,
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
