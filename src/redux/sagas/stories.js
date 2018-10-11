import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as API from '../../utils/api';
import {
  GET_ASK,
  GET_SHOW,
  GET_BEST,
  GET_TOP,
  GET_NEW,
  setAskStories,
  setBestStories,
  setNewStories,
  setShowStories,
  setTopStories
} from '../stories';

function* getStories(actionCreator, promise) {
  try {
    const result = yield call(promise);
    yield put(actionCreator(result));
  } catch (err) {
    console.log(err);
  }
}

export function* watchStories() {
  yield all([
    yield takeLatest(GET_ASK, getStories, setAskStories, API.getAskStories),
    yield takeLatest(GET_SHOW, getStories, setShowStories, API.getShowStories),
    yield takeLatest(GET_BEST, getStories, setBestStories, API.getBestStories),
    yield takeLatest(GET_TOP, getStories, setTopStories, API.getTopStories),
    yield takeLatest(GET_NEW, getStories, setNewStories, API.getNewStories)
  ]);
}
