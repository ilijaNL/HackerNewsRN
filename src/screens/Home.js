import React from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { StyleSheet, InteractionManager, Dimensions, View } from 'react-native';

import Ask from './home/Ask';
import New from './home/New';
import Show from './home/Show';
import Top from './home/Top';

import Screen from '../components/Screen';

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: 'white'
  },
  labelStyle: {
    color: '#ff6600'
  },
  indicatorStyle: {
    height: StyleSheet.hairlineWidth * 10,
    backgroundColor: '#ff6600'
  }
});

const Tabs = {
  top: () => <Top />,
  new: () => <New />,
  ask: () => <Ask />,
  show: () => <Show />
};

class Home extends React.PureComponent {
  state = {
    index: 0,
    loadingComponent: true,
    routes: [
      { key: 'top', title: 'Top' },
      { key: 'new', title: 'New' },
      { key: 'ask', title: 'Ask' },
      { key: 'show', title: 'Show' }
    ]
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.state.loadingComponent) {
        this.setState({ loadingComponent: false });
      }
    });
  }

  _renderScene = ({ route }) => {
    if (Tabs[route.key] && !this.state.loadingComponent) {
      return Tabs[route.key](); // use factory function (performance)
    }
    return <View />;
  };

  _onIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabbar}
      pressColor="#d6d6d6"
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle}
      useNativeDriver
    />
  );

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._onIndexChange}
        initialLayout={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        tabBarPosition="bottom"
      />
    );
  }
}

export default class extends React.Component {
  render() {
    return (
      <Screen {...this.props}>
        <Home />
      </Screen>
    );
  }
}
