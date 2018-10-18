import React from 'react';
import { FlatList } from 'react-native';
import StoryListItem from './StoryListItem';

const CHUNK_SIZE = 11;

export default class extends React.PureComponent {
  // we slice for performance
  state = {
    listSize: CHUNK_SIZE,
    data: this.props.data.slice(0, CHUNK_SIZE)
  };

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data.slice(0, state.listSize)
    };
  }

  _keyExtractor = item => item.toString();
  _renderItem = ({ item }) => <StoryListItem id={item} />;
  _onEndReached = () => {
    this.setState(state => ({
      listSize: state.listSize + CHUNK_SIZE,
      data: this.props.data.slice(0, state.listSize + CHUNK_SIZE)
    }));
  };

  render() {
    const { renderItem, pullToRefresh, loading } = this.props;
    const { data } = this.state;

    return (
      <FlatList
        refreshing={loading}
        data={data}
        onRefresh={pullToRefresh}
        renderItem={renderItem || this._renderItem}
        onEndReached={this._onEndReached}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}
