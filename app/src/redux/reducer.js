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

  // TODO: somehow it doesn't return the whole state, just the delta? state is undefined here
  // so just update local state of component in the action, then we just need to return once at bottom
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
      var data = await loader.loadData()
      return Object.assign({}, state, data)
    default:
      var data = await loader.loadData()
      return Object.assign({}, state, data)
  };

};

export default reducer;
