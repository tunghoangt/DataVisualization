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

  // TODO: make sure we're just calling loadData() once at bottom
  switch(action.type) {
    case CHANGE_YEAR:
      loader.updateState("Year", action.year.toString())
      var data = await loader.loadData()
      return Object.assign({}, state, data)
    case CHANGE_US_STATE:
      var data = await loader.loadData()
      return Object.assign({}, state, data)
    case CHANGE_SPECIES:
      var data = await loader.loadData()
      return Object.assign({}, state, data)
    case CHANGE_UNIT:
      loader.updateState("aggregateBy", action.unit)
      var data = await loader.loadData()
      return Object.assign({}, state, data)
    default:
      var data = await loader.loadData()
      return Object.assign({}, state, data)
  };

};

export default reducer;
