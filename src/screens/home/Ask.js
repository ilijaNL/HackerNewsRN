import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAskStories } from '../../redux/stories';

class Ask extends React.Component {
  componentDidMount() {
    this.props.getAskStories();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View>
        {console.log('render ask')}
        <Text>Ask</Text>
      </View>
    );
  }
}

export default connect(
  null,
  { getAskStories }
)(Ask);
