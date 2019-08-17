const NEW_HIT = 'hit';
const initialState = { hits: 0 };

export const newHit = () => ({
  type: NEW_HIT,
});

export const hitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_HIT:
      return {
        ...state,
        hits: state.hits + 1,
      };
    default:
      return state;
  }
};
