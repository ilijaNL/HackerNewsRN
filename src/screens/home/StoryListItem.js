import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import dayjs from 'dayjs';
import { pure } from 'recompose';
import relativeTime from 'dayjs/plugin/relativeTime';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { fetchItem } from '../../redux/items';
import Navigator from '../../utils/ComponentNavigator';
import StoryScreen from '../Story';

dayjs.extend(relativeTime);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderBottomColor: 'rgb(220, 220, 220)',
    borderBottomWidth: StyleSheet.hairlineWidth * 2
  },
  buttonContainer: {
    padding: 15,
    paddingRight: 5
  },
  contentContainer: {
    flex: 1,
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
    marginBottom: 8,
    backgroundColor: 'rgb(230,230,230)'
  },
  dummySubText: {
    height: 12,
    width: '90%',
    backgroundColor: 'rgb(230,230,230)'
  },
  dummyButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgb(230,230,230)'
  }
});

const DummyItem = () => (
  <Animatable.View
    style={styles.container}
    animation="fadeIn"
    easing="ease-out"
    iterationCount="infinite"
    direction="alternate"
    duration={800}
    useNativeDriver
  >
    <View style={styles.contentContainer}>
      <View style={styles.dummyTitle} />
      <View style={styles.dummySubText} />
    </View>
    <View style={styles.buttonContainer}>
      <View style={styles.dummyButton} />
    </View>
  </Animatable.View>
);

const DataItem = pure(({ item, onLinkClick, onClick }) => (
  <TouchableOpacity onPress={onClick} style={styles.container}>
    <View style={styles.contentContainer}>
      <Text key="title" numberOfLines={2} style={styles.title}>
        {item.title.trim()}
      </Text>
      <Text key="subText" numberOfLines={1} style={styles.subText}>
        {item.score} points by {item.by} {dayjs(item.time * 1000).fromNow()} |{' '}
        {item.descendants} comments
      </Text>
    </View>
    {item.url && (
      <TouchableOpacity style={styles.buttonContainer} onPress={onLinkClick}>
        <Icon name="tab" size={32} />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
));

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

  openLink = () => {
    const { item } = this.props;
    if (item && item.url && item.url !== '') {
      Linking.openURL(item.url).catch(err =>
        console.error('An error occurred', err)
      );
    }
  };

  goToStory = () => {
    console.log(this.props);
    this.props.pushScreen(StoryScreen, { id: this.props.id });
  };

  render() {
    const { item } = this.props;
    return item ? (
      <DataItem
        item={item}
        onLinkClick={this.openLink}
        onClick={this.goToStory}
      />
    ) : (
      <DummyItem />
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
)(props => (
  <Navigator.Consumer>
    {({ actions }) => (
      <StoryListItem {...props} pushScreen={actions.pushScreen} />
    )}
  </Navigator.Consumer>
));
