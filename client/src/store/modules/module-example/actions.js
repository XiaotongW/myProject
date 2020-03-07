// Action functions (Could be asynchronous)
// Actions are similar to mutations, the differences being that:
//   - Instead of mutating the state, actions commit mutations.
//   - Actions can contain arbitrary asynchronous operations.
//
// It is better to return a promise in the stock in order to be
// able to determine when it ends.
const actions = {
  someAction(/* context */) {},
};

export default actions;
