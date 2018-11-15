import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import appReducer from './reducers/app'
import thunk from 'redux-thunk';

const reducer = combineReducers({
	app: appReducer
});

const middlewares = [
	thunk
];

const enhancer = applyMiddleware(...middlewares);

const store = createStore(reducer, enhancer);

export default store;