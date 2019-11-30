import Loader from './loader';
import {
  CHANGE_YEAR,
  CHANGE_US_STATE,
  CHANGE_SPECIES,
  CHANGE_UNIT
} from './actions';


const initialState = [{
  year: "all",
  usState: "all",
  species: "all", // hard code this for now so it runs
  aggregateBy: "Dollars"
}];

let loader = new Loader();

// TODO: this just have to recieve a new state right, there's not really any actions per se, just new states
async function reducer(state = initialState, action) {
  console.log("action = ", action)
  switch(action.type) {
    case CHANGE_YEAR:
      var data = await loader.loadData(action.year, state.usState, state.species, state.aggregateBy)
      return Object.assign({}, state, data)
    case CHANGE_US_STATE:
      var data = await loader.loadData(state.year, action.usState, state.species, state.aggregateBy)
      return Object.assign({}, state, data)
    case CHANGE_SPECIES:
      var data = await loader.loadData(state.year, state.usState, action.species, state.aggregateBy)
      return Object.assign({}, state, data)
    case CHANGE_UNIT:
      var data = await loader.loadData(state.year, state.usState, state.species, action.aggregateBy)
      return Object.assign({}, state, data)
    default:
      var data = await loader.loadData(state.year, state.usState, state.species, state.aggregateBy)
      return Object.assign({}, state, data)
  };

};

export default reducer;
