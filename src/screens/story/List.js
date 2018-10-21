import React from 'react';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import Comment from './Comment';

const CHUNK_SIZE = 8;

export class DummyList extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {_.times(Math.min(this.props.items, 4), i => (
          <Comment key={i} id={-1} lvl={1} />
        ))}
      </View>
    );
  }
}

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
        data={data}
        renderItem={this._renderItem}
        onEndReached={this._onEndReached}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

export default List;
