import Loader from './loader';
import {
  CHANGE_YEAR,
  CHANGE_US_STATE,
  CHANGE_SPECIES,
  CHANGE_UNIT
} from './actions';


const initialState = {
  year: "all",
  usState: "all",
  species: "all",
  aggregateBy: "Dollars"
};

let loader = new Loader();

async function reducer(state = initialState, action) {

  console.log("state = ", state)
  console.log("action.type = ", action.type)

  // TODO: this seems to be returning a promise; figure out how to get the state out
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
