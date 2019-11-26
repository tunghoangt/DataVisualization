import Loader from './loader';

const initialState = [{
  year: "all",
  usState: "all",
  species: "all", // hard code this for now so it runs
  aggregateBy: "Dollars"
}];

let loader = new Loader();

async function reducer(state = initialState, action) {
  let data = await loader.loadData(state.year, state.usState, state.species, state.aggregateBy)
  return Object.assign({}, state, data)
};

export default reducer;
