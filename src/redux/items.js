export const GET_ITEM = 'GET_ITEM';

export const fetchItem = id => ({ type: GET_ITEM, id });

// helper reducer
export const setItem = (state, payload) => {
  const { id } = payload;

  // check if we need to add to array
  if (!state.byId[id]) {
    state.allIds.push(id);
  }
  state.byId[id] = payload;
};
