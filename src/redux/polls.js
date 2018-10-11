import createReducer from '../utils/createReducer';

const initialState = {
  byId: {},
  allIds: []
};

const RESOURCE = '[POLL]';

const SET = 'SET ' + RESOURCE;

export default createReducer(initialState, {
  [SET](state, { payload }) {
    const { id, ...data } = payload;

    const allIds = [...state.allIds];
    // check if we need to add to array
    if (!state.byId[id]) {
      allIds.push(id);
    }

    return {
      byIds: {
        ...state.byId,
        [id]: data
      },
      allIds
    };
  }
});

export const setPoll = payload => ({ type: SET, payload });
