import Loader from './loader';

const initialState = {
  year: "all",
  usState: "all",
  species: "all",
  aggregateBy: "Dollars"
};

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 */

let loader = new Loader();

function reducer(state = initialState, action) {
  let newData = loader.loadData(state.year, state.usState, state.species, state.aggregateBy)
  return Object.assign({}, state, newData)
};

export default reducer;
