import React from 'react';
import { FlatList } from 'react-native';
import StoryListItem from './StoryListItem';

export default class extends React.PureComponent {
  _keyExtractor = item => item.toString();
  _renderItem = ({ item }) => <StoryListItem id={item} />;

  render() {
    const { data, renderItem } = this.props;

    return (
      <FlatList
        data={data}
        initialNumToRender={10}
        renderItem={renderItem || this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}
