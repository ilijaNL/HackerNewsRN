import React from 'react';
import { FlatList } from 'react-native';
import StoryListItem from './StoryListItem';

const CHUNK_SIZE = 15;

export default class extends React.PureComponent {
  // we slice for performance
  state = {
    listSize: CHUNK_SIZE,
    data: this.props.data.slice(0, CHUNK_SIZE)
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      this.setState(state => ({
        data: this.props.data.slice(0, state.listSize)
      }));
    }
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
    const { renderItem, pullToRefresh } = this.props;
    const { data } = this.state;

    return (
      <FlatList
        refreshing={false}
        data={data}
        onRefresh={pullToRefresh}
        renderItem={renderItem || this._renderItem}
        onEndReached={this._onEndReached}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}
