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
  // TODO: we're never going to filter by species right? we can remove that action
  switch(action.type) {
    case CHANGE_YEAR:
      const newYear = action.year.toString()
      loader.updateState("Year", newYear)
      var data = await loader.loadData()
      return Object.assign({}, state, {...data, year: newYear})
    case CHANGE_US_STATE:
      var data = await loader.loadData()
      return Object.assign({}, state, {...data})
    case CHANGE_SPECIES:
      var data = await loader.loadData()
      return Object.assign({}, state, {...data})
    case CHANGE_UNIT:
      const newUnit = action.unit
      loader.updateState("aggregateBy", newUnit)
      var data = await loader.loadData()
      return Object.assign({}, state, {...data, unit: newUnit})
    default:
      var data = await loader.loadData()
      return Object.assign({}, state, {...data})
  };

};

export default reducer;
