import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { fetchItem } from '../redux/items';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    height: 80,
    borderBottomColor: 'rgb(230, 230, 230)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    color: 'black',
    paddingBottom: 5
  },
  subText: {
    fontSize: 12
  },
  dummyTitle: {
    height: 35,
    marginBottom: 5,
    backgroundColor: 'rgb(220,220,220)'
  },
  dummySubText: {
    height: 14,
    width: '50%',
    backgroundColor: 'rgb(220,220,220)'
  }
});

const DummyItem = () => (
  <Animatable.View
    animation="fadeIn"
    easing="ease-out"
    iterationCount="infinite"
    direction="alternate"
    duration={1500}
    useNativeDriver
  >
    <View style={styles.dummyTitle} />
    <View style={styles.dummySubText} />
  </Animatable.View>
);

const DataItem = ({ item }) => [
  <Text key="title" numberOfLines={2} style={styles.title}>
    {item.title.trim()}
  </Text>,
  <Text key="subText" numberOfLines={1} style={styles.subText}>
    {item.score} points by {item.by} {dayjs(item.time * 1000).fromNow()} |{' '}
    {item.descendants} comments
  </Text>
];

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
    const { item } = this.props;
    return (
      <View style={styles.container}>
        {item ? <DataItem item={item} /> : <DummyItem />}
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
