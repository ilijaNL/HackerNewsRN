// import all sagas here
import { all } from 'redux-saga/effects';
import { fetchItem } from './sagas/items';
import { watchStories } from './sagas/stories';

export default function* rootSaga() {
  yield all([fetchItem(), watchStories()]);
}
