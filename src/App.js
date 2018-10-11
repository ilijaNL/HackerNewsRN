import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Provider, connect } from 'react-redux';
import { store } from './store';
import { addComment } from './redux/comments';

const TestView = ({ comments, addComment }) => (
  <View>
    <Text># Comments: {comments}</Text>
    <TouchableOpacity
      onPress={() => {
        addComment({ id: 1, text: 'test' });
      }}
    >
      <Text>Add comment</Text>
    </TouchableOpacity>
  </View>
);

const ReduxTest = connect(
  state => ({
    comments: state.comments.allIds.length
  }),
  { addComment }
)(TestView);

const App = () => (
  <Provider store={store()}>
    <ReduxTest />
  </Provider>
);

export default App;
