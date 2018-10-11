import React from 'react';
import { View, Text } from 'react-native';

export default class extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View>
        {console.log('render top')}
        <Text>top</Text>
      </View>
    );
  }
}
