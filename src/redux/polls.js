import createReducer from '../utils/createReducer';
import { setItem } from './items';

const initialState = {
  byId: {},
  allIds: []
};

const RESOURCE = '[POLL]';

const SET = 'SET ' + RESOURCE;

export default createReducer(initialState, {
  [SET](state, { payload }) {
    setItem(state, payload);
  }
});

export const setPoll = payload => ({ type: SET, payload });
