import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import HTML from 'react-native-render-html';

import { fetchItem } from '../../redux/items';

dayjs.extend(relativeTime);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 15
  },
  kidsContainer: {
    paddingLeft: 8,
    borderLeftWidth: 4
  },
  contentText: {
    borderBottomColor: 'rgb(200, 200, 200)',
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth * 1
  },
  contentInfo: {
    opacity: 0.8,
    fontSize: 14,
    paddingBottom: 5
  },
  dummyContentInfo: {
    height: 18,
    marginBottom: 5,
    backgroundColor: 'rgb(230,230,230)'
  },
  dummyContentText: {
    borderBottomColor: 'rgb(200, 200, 200)',
    marginBottom: 4,
    paddingBottom: 3,
    borderBottomWidth: StyleSheet.hairlineWidth * 1,
    backgroundColor: 'rgb(230,230,230)',
    height: 80
  }
});

const getAlpha = value => {
  const step = 0.3;
  return value * step;
};

const openLink = (_, href) => {
  Linking.openURL(href).catch(err => console.error('An error occurred', err));
};

const DataItem = ({ item, lvl }) => {
  return item.text && item.text.length ? (
    <View style={[styles.container, lvl > 1 && { paddingHorizontal: 0 }]}>
      <Text style={styles.contentInfo}>
        {dayjs(item.time * 1000).fromNow()} by {item.by}
      </Text>
      <HTML
        onLinkPress={openLink}
        html={item.text.trim()}
        containerStyle={styles.contentText}
      />
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
  ) : null;
};

const DummyItem = ({ lvl }) => (
  <Animatable.View
    style={[styles.container, lvl > 1 && { paddingHorizontal: 0 }]}
    animation="fadeIn"
    easing="ease-out"
    iterationCount="infinite"
    direction="alternate"
    duration={800}
    useNativeDriver
  >
    <View style={styles.dummyContentInfo} />
    <View style={styles.dummyContentText} />
  </Animatable.View>
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

    return item ? <DataItem item={item} lvl={lvl} /> : <DummyItem lvl={lvl} />;
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
