import React from 'react';
import { FlatList, Text } from 'react-native';
import Comment from './Comment';

const CHUNK_SIZE = 15;

class List extends React.Component {
  // we slice for performance
  state = {
    listSize: CHUNK_SIZE,
    data: []
  };

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data.slice(0, state.listSize)
    };
  }

  _keyExtractor = item => item.toString();
  _renderItem = ({ item }) => <Comment id={item} lvl={1} />;
  _onEndReached = () => {
    this.setState(state => ({
      listSize: state.listSize + CHUNK_SIZE,
      data: this.props.data.slice(0, state.listSize + CHUNK_SIZE)
    }));
  };

  render() {
    const { data } = this.state;

    return (
      <FlatList
        refreshing={false}
        data={data}
        onRefresh={() => {}}
        renderItem={this._renderItem}
        onEndReached={this._onEndReached}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

export default List;
