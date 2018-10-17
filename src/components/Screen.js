import React from 'react';
import { Animated, Easing } from 'react-native';

const IN_ANIMATION_DURATION = 175;
const OUT_ANIMATION_DURATION = 75;

class Screen extends React.Component {
  animation = new Animated.Value(this.props.transition === 'IN' ? 0 : 1);

  componentDidUpdate(prevProps) {
    if (prevProps.transition === 'IDLE' && this.props.transition === 'OUT') {
      Animated.timing(this.animation, {
        toValue: 0,
        easing: Easing.ease,
        duration: OUT_ANIMATION_DURATION,
        useNativeDriver: true
      }).start();
    }
  }

  componentDidMount() {
    if (this.props.transition === 'IN') {
      Animated.timing(this.animation, {
        toValue: 1,
        easing: Easing.in(),
        duration: IN_ANIMATION_DURATION,
        useNativeDriver: true
      }).start();
    }
  }

  render() {
    const { isBackground, transition, id } = this.props;
    console.log('render screen', { isBackground, transition, id });
    const animation = this.animation;

    return (
      <Animated.View
        style={{
          position: 'absolute',
          backgroundColor: '#f6f6ef',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          opacity: animation.interpolate({
            inputRange: [0, 0.001, 1],
            outputRange: [0, 0.7, 1]
          }),
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 0.0001, 1],
                outputRange: [10000, 200, 0]
              })
            },
            {
              translateX: !!isBackground ? 10000 : 0
            }
          ]
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default Screen;
