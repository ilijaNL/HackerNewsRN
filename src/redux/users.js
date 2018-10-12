import createReducer from '../utils/createReducer';
import { setItem } from './items';

const initialState = {
  byId: {},
  allIds: []
};

const RESOURCE = '[USER]';

const SET = 'SET ' + RESOURCE;

export default createReducer(initialState, {
  [SET](state, { payload }) {
    setItem(state, payload);
  }
});

export const setUser = payload => ({ type: SET, payload });
