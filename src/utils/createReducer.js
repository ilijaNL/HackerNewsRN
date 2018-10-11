export default (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers[action.type] !== undefined) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};
