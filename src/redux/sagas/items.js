import { call, put, take, fork } from 'redux-saga/effects';
import * as API from '../../utils/api';
import { setComment } from '../comments';
import { setPoll } from '../polls';
import { setStory } from '../stories';
import { GET_ITEM } from '../items';

function* getItem(id, onFinish) {
  try {
    const result = yield call(API.getItem, id);

    // determine what kind item this is and put it into the store

    const { type, ...payload } = result;
    if (type === 'story') {
      yield put(setStory(payload));
    } else if (type === 'comment') {
      yield put(setComment(payload));
    } else if (type === 'poll') {
      yield put(setPoll(payload));
    }
  } catch (err) {
    console.log(err);
  } finally {
    // when finished, remove item from reqs
    onFinish(id);
  }
}

export function* fetchItem() {
  let cachedRequests = {};

  const onFinish = id => {
    const { [id]: i, ...rest } = cachedRequests;
    cachedRequests = rest;
  };

  while (true) {
    const { id } = yield take(GET_ITEM);
    if (!cachedRequests[id]) {
      // if we already have requested it
      // we do the item request with this id, fork
      cachedRequests[id] = yield fork(getItem, id, onFinish); // we request the item here
    }
  }
}
