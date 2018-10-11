import React from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { StyleSheet } from 'react-native';

import Ask from './home/Ask';
import New from './home/New';
import Show from './home/Show';
import Top from './home/Top';

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: 'white'
  },
  labelStyle: {
    color: '#4c4c4c'
  },
  indicatorStyle: {
    height: StyleSheet.hairlineWidth * 10,
    backgroundColor: '#4c4c4c'
  }
});

const Tabs = {
  top: () => <Top />,
  new: () => <New />,
  ask: () => <Ask />,
  show: () => <Show />
};

export default class extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'top', title: 'Top' },
      { key: 'new', title: 'New' },
      { key: 'ask', title: 'Ask' },
      { key: 'show', title: 'Show' }
    ]
  };

  _renderScene = ({ route }) => {
    if (Tabs[route.key]) {
      return Tabs[route.key](); // use factory function (performance)
    }
    return null;
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
    />
  );

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._onIndexChange}
        tabBarPosition="bottom"
      />
    );
  }
}
