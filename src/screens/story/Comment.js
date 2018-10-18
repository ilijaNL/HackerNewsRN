import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import dayjs from 'dayjs';
import { pure } from 'recompose';
import relativeTime from 'dayjs/plugin/relativeTime';

import { fetchItem } from '../../redux/items';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 3
  },
  kidsContainer: {
    paddingLeft: 6,
    borderLeftWidth: 4
  }
});

const getAlpha = value => {
  const step = 0.3;
  return value * step;
};

const DataItem = ({ item, lvl }) => (
  <View style={styles.container}>
    <Text>{item.text}</Text>
    {item.kids && item.kids.length > 0 ? (
      <View
        style={[
          styles.kidsContainer,
          { borderLeftColor: `rgba(255, 102, 0, ${getAlpha(lvl)})` }
        ]}
      >
        {item.kids.map(kid => (
          <Comment key={kid} lvl={lvl + 1} id={kid} />
        ))}
      </View>
    ) : null}
  </View>
);

class _Comment extends React.Component {
  componentDidMount() {
    // check if we need to fetch the item
    const { item, id } = this.props;
    if (!item) {
      this.props.fetchItem(id);
    }
  }

  render() {
    const { item, id, lvl } = this.props;

    return item ? <DataItem item={item} lvl={lvl} /> : <Text>{id}</Text>;
  }
}

const mapStateToProps = (state, props) => {
  return {
    item: state.comments.byId[props.id]
  };
};

const Comment = connect(
  mapStateToProps,
  { fetchItem }
)(_Comment);

export default Comment;
