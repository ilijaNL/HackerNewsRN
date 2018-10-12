import produce, { setAutoFreeze } from 'immer';

// performance
setAutoFreeze(__DEV__);

export default (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers[action.type] !== undefined) {
      return produce(state, draftState =>
        handlers[action.type](draftState, action)
      );
    }
    return state;
  };
};
