import React, { Component, createContext, PureComponent } from 'react';
import PropTypes from 'prop-types';

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

class PureComp extends PureComponent {
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
      {
        Component: this.props.initialComponent,
        data: this.props.initialData || {},
        transition: TRANSITION_STATES.IDLE,
        _id: generateUniqueKey()
      }
    ]
  });

  _push = async (Component, data, transition = 300) => {
    const stackItem = {
      _id: generateUniqueKey(), // used internal to replace this item
      Component,
      data,
      transition: TRANSITION_STATES.IN
    };

    this.setState(state => ({
      stack: [...state.stack, stackItem]
    }));

    await new Promise(resolve => setTimeout(resolve, transition));

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
  };

  _pop = async (transition = 250) => {
    if (this.state.stack.length <= 1) {
      return;
    }
    this.setState(({ stack }) => {
      const lastIdx = stack.length - 1;
      const lastScreen = stack[lastIdx];
      const newScreen = Object.assign({}, lastScreen, {
        transition: TRANSITION_STATES.OUT
      });
      return {
        stack: [...stack.slice(0, -1), newScreen]
      };
    });

    await new Promise(resolve => setTimeout(resolve, transition));

    this.setState(({ stack }) => ({
      stack: stack.slice(0, -1)
    }));
  };

  actions = {
    pushScreen: this._push,
    popScreen: this._pop
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
