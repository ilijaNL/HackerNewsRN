import React, { Component, createContext } from 'react';
import { Animated, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const initialState = {
  stack: []
};

const initialContext = {
  state: initialState,
  actions: {}
};

const TRANSITION_STATES = {
  IN: 'IN',
  IDLE: 'IDLE',
  OUT: 'OUT'
};

const NavigatorContext = createContext(initialContext);

const generateUniqueKey = () => {
  return Math.random()
    .toString(36)
    .substring(7);
};

const isForeground = (idx, arr) => {
  return (
    arr.length - 1 === idx ||
    (arr.length - 2 === idx &&
      arr[arr.length - 1].transition !== TRANSITION_STATES.IDLE)
  );
};

const createStackItem = (Component, data = {}, initial = false) => {
  return {
    Component,
    data,
    transition: initial ? TRANSITION_STATES.IDLE : TRANSITION_STATES.IN,
    animation: new Animated.Value(initial ? 1 : 0),
    _id: generateUniqueKey()
  };
};

const animateValue = (animatedValue, to, duration) => {
  return new Promise(resolve => {
    Animated.timing(animatedValue, {
      toValue: to,
      duration: duration,
      useNativeDriver: true
    }).start(resolve);
  });
};

class PureComp extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isBackground !== nextProps.isBackground;
  }
  render() {
    const { Component, ...props } = this.props;
    return <Component {...props} />;
  }
}

export default class extends Component {
  static Consumer = NavigatorContext.Consumer;

  static propTypes = {
    initialComponent: PropTypes.func.isRequired,
    initialData: PropTypes.object
  };

  state = Object.assign({}, initialState, {
    stack: [
      createStackItem(this.props.initialComponent, this.props.initialData, true)
    ]
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.actions.popScreen);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.actions.popScreen
    );
  }

  _push = async (Component, data, transition = 210) => {
    const stackItem = createStackItem(Component, data);

    this.setState(state => ({
      stack: [...state.stack, stackItem]
    }));

    await animateValue(stackItem.animation, 1, transition);

    const i = Object.assign({}, stackItem, {
      transition: TRANSITION_STATES.IDLE
    });

    // immutable set transition on the affected screen
    this.setState(state => ({
      stack: state.stack.reduce((acc, cur) => {
        if (cur._id === i._id) {
          acc.push(i);
        } else {
          acc.push(cur);
        }

        return acc;
      }, [])
    }));

    BackHandler.addEventListener('hardwareBackPress', this.actions.popScreen);
  };

  _pop = async (transition = 210) => {
    if (
      this.state.stack.length <= 1 ||
      !this.state.stack
        .slice(1)
        .some(w => w.transition === TRANSITION_STATES.IDLE)
    ) {
      return;
    }

    const lastScreen = this.state.stack[this.state.stack.length - 1];
    console.log({ lastScreen });
    const newScreen = Object.assign({}, lastScreen, {
      transition: TRANSITION_STATES.OUT
    });

    this.setState(({ stack }) => ({
      stack: [...stack.slice(0, -1), newScreen]
    }));

    await animateValue(lastScreen.animation, 0, transition);

    this.setState(
      ({ stack }) => ({
        stack: stack.filter(s => s._id !== newScreen._id)
      }),
      () => {
        if (this.state.stack.length < 2) {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            this.actions.popScreen
          );
        }
      }
    );
  };

  actions = {
    pushScreen: debounce(this._push, 300, { leading: true, trailing: false }),
    popScreen: debounce(this._pop, 300, { leading: true, trailing: false })
  };

  render() {
    const value = {
      actions: this.actions
    };

    console.log({ stack: this.state.stack });

    return (
      <NavigatorContext.Provider value={value}>
        {this.state.stack.map(({ _id, ...props }, index, arr) => (
          <PureComp
            key={_id}
            id={_id}
            {...props}
            actions={this.actions}
            isBackground={!isForeground(index, arr)}
          />
        ))}
      </NavigatorContext.Provider>
    );
  }
}
