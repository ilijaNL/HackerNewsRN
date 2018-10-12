import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { fetchItem } from '../redux/items';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

class StoryListItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item;
  }

  componentDidMount() {
    // check if we need to fetch the item
    const { item, id } = this.props;
    if (!item) {
      this.props.fetchItem(id);
    }
  }

  render() {
    const { item, id } = this.props;
    return (
      <View style={styles.container}>
        <Text>{item ? item.title : id}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    item: state.stories.byId[props.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchItem }
)(StoryListItem);
