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
  setTopStories,
  setLoadingStories
} from '../stories';

function* getStories(actionCreator, promise, list) {
  try {
    yield put(setLoadingStories({ value: true, list }));
    const result = yield call(promise);
    yield put(actionCreator(result));
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setLoadingStories({ value: false, list }));
  }
}

export function* watchStories() {
  yield all([
    yield takeLatest(
      GET_ASK,
      getStories,
      setAskStories,
      API.getAskStories,
      'ask'
    ),
    yield takeLatest(
      GET_SHOW,
      getStories,
      setShowStories,
      API.getShowStories,
      'show'
    ),
    yield takeLatest(
      GET_BEST,
      getStories,
      setBestStories,
      API.getBestStories,
      'best'
    ),
    yield takeLatest(
      GET_TOP,
      getStories,
      setTopStories,
      API.getTopStories,
      'top'
    ),
    yield takeLatest(
      GET_NEW,
      getStories,
      setNewStories,
      API.getNewStories,
      'new'
    )
  ]);
}
