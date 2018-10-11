import createReducer from '../utils/createReducer';

const initialState = {
  byId: {},
  allIds: []
};

const RESOURCE = 'COMMENT';

const ADD = 'ADD_' + RESOURCE;
const UPDATE = 'UPDATE_' + RESOURCE;

export default createReducer(initialState, {
  [ADD](state, { payload }) {
    const { id, text } = payload;
    return {
      byIds: {
        ...state.byId,
        [id]: {
          id,
          text
        }
      },
      allIds: [...state.allIds, id]
    };
  },
  [UPDATE](state, { payload }) {
    return state;
  }
});

export const addComment = payload => ({ type: ADD, payload });
export const updateComment = payload => ({ type: UPDATE, payload });
