import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import polls from './redux/polls';
import comments from './redux/comments';
import stories from './redux/stories';
import users from './redux/users';
import rootSaga from './redux/sagas';

export const store = () => {
  const reducer = combineReducers({
    polls,
    comments,
    stories,
    users
  });

  console.log({ dev: __DEV__ });

  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];
  if (__DEV__) {
    middleWares.push(createLogger());
  }

  const s = createStore(reducer, applyMiddleware(...middleWares));
  sagaMiddleware.run(rootSaga);

  return s;
};
