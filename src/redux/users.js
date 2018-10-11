import createReducer from '../utils/createReducer';

const initialState = {
  byId: {},
  allIds: []
};

const RESOURCE = 'USER';

const ADD = 'ADD_' + RESOURCE;
const UPDATE = 'UPDATE_' + RESOURCE;

export default createReducer(initialState, {
  [ADD](state, { payload }) {
    return state;
  },
  [UPDATE](state, { payload }) {
    return state;
  }
});

export const addUser = payload => ({ type: ADD, payload });
export const updateUser = payload => ({ type: UPDATE, payload });
