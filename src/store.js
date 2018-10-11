import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
import polls from './redux/polls';
import comments from './redux/comments';
import stories from './redux/stories';
import users from './redux/users';

export const store = () => {
  const reducer = combineReducers({
    polls,
    comments,
    stories,
    users
  });

  console.log({ dev: __DEV__ });

  const logger = createLogger({
    predicate: () => !!__DEV__
  });

  return createStore(reducer, applyMiddleware(logger));
};
