import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#f6f6ef',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

export default props => (
  <Animated.View
    style={[
      style.container,
      {
        opacity: props.animation,
        transform: [
          {
            translateY: props.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [200, 0]
            })
          },
          {
            translateX: props.isBackground ? 10000 : 0
          }
        ]
      }
    ]}
  >
    {props.children}
  </Animated.View>
);
