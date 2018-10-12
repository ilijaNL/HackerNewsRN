import createReducer from '../utils/createReducer';
import { setItem } from './items';

const initialState = {
  byId: {},
  allIds: [],
  loading: {
    top: false,
    new: false,
    best: false,
    ask: false,
    show: false
  },
  top: [],
  new: [],
  best: [],
  ask: [],
  show: []
};

const RESOURCE = '[STORY]';

const SET = 'SET ' + RESOURCE;

export const GET_TOP = 'GET_TOP ' + RESOURCE;
export const GET_NEW = 'GET_NEW ' + RESOURCE;
export const GET_BEST = 'GET_BEST ' + RESOURCE;
export const GET_ASK = 'GET_ASK ' + RESOURCE;
export const GET_SHOW = 'GET_SHOW ' + RESOURCE;

export const SET_TOP = 'SET_TOP ' + RESOURCE;
export const SET_NEW = 'SET_NEW ' + RESOURCE;
export const SET_BEST = 'SET_BEST ' + RESOURCE;
export const SET_ASK = 'SET_ASK ' + RESOURCE;
export const SET_SHOW = 'SET_SHOW ' + RESOURCE;

export const SET_LOADING = 'SET_LOADING ' + RESOURCE;

export default createReducer(initialState, {
  [SET](state, { payload }) {
    setItem(state, payload);
  },
  [SET_TOP](state, { payload }) {
    state.top = payload;
  },
  [SET_NEW](state, { payload }) {
    state.new = payload;
  },
  [SET_BEST](state, { payload }) {
    state.best = payload;
  },
  [SET_ASK](state, { payload }) {
    state.ask = payload;
  },
  [SET_SHOW](state, { payload }) {
    state.show = payload;
  },
  [SET_LOADING](state, { payload }) {
    const { list, value } = payload;
    state.loading[list] = value;
  }
});

export const setStory = payload => ({ type: SET, payload });

export const getTopStories = () => ({ type: GET_TOP });
export const getNewStories = () => ({ type: GET_NEW });
export const getBestStories = () => ({ type: GET_BEST });
export const getAskStories = () => ({ type: GET_ASK });
export const getShowStories = () => ({ type: GET_SHOW });

export const setTopStories = payload => ({ type: SET_TOP, payload });
export const setNewStories = payload => ({ type: SET_NEW, payload });
export const setBestStories = payload => ({ type: SET_BEST, payload });
export const setAskStories = payload => ({ type: SET_ASK, payload });
export const setShowStories = payload => ({ type: SET_SHOW, payload });

export const setLoadingStories = payload => ({ type: SET_LOADING, payload });
