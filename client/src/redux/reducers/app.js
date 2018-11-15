import {Map} from 'immutable'
import {SET_APP_NAME} from '../consts/app'

const initState = Map({
	appName: 'SNCF-LIVE',
});

const handlers = {
	[SET_APP_NAME]: (state, action) => state.set('appName', action.payload)
};

export default (state = initState, action) => {
	if(typeof handlers[action.type] === 'function')
		return handlers[action.type](state, action);
	return state
}