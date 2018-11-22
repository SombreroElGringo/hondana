import { Map } from 'immutable';
import {
  FETCH_STATIONS,
  FETCH_STATIONS_FAIL,
  FETCH_STATIONS_SUCCESS,
  SET_APP_NAME,
} from '../consts/app';

const initState = Map({
  appName: 'SNCF-LIVE',
  stations: null,
});

const handlers = {
  [SET_APP_NAME]: (state, action) => state.set('appName', action.payload),

  [FETCH_STATIONS]: state => state.set('stations', undefined),
  [FETCH_STATIONS_SUCCESS]: (state, action) =>
    state.set('stations', action.payload),
  [FETCH_STATIONS_FAIL]: state => state.set('stations', null),
};

export default (state = initState, action) => {
  if (typeof handlers[action.type] === 'function')
    return handlers[action.type](state, action);
  return state;
};
