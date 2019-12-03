import * as d3 from 'd3';
import landings from '../data/clean_landings.csv';

class Loader {

  // TODO: clean data s.t. AFS Name |-> Species
  /*Fields: "AFS Name",Collection,Confidentiality,Dollars,Pounds,State,Year*/
  constructor() {
    this.filters = {
      Year: "all",
      State: "all",
      Species: "all",
      aggregateBy: "Dollars" // or "Pounds"
    }

    this.updateState.bind(this)
  }

  // TODO: we can probably merge this to make loadDataOnDelta
  updateState = (key, value) => {
    this.filters[key] = value
  }

  // TODO: add usState filtration & remove use of AFS Name
  loadData() {
    return d3.csv(landings).then( data => {
      const filteredByYear = this.filterByKey("Year", data)
      const stateAggData = filteredByYear.map(x => [x["State"], x[this.filters.aggregateBy]])
                                    .filter(this.filterNaN)
                                    .reduce(this.sumByKey, {})
      const speciesAggData = filteredByYear.map(x => [x["Species"], x[this.filters.aggregateBy]])
                                           .filter(this.filterNaN)
                                           .reduce(this.sumByKey, {})
      return {
        stateData: stateAggData,
        speciesData: speciesAggData
      };
    }).catch( err => {
      throw err
    })
  };

  filterByKey(key, data) {
    return this.filters[key] === "all" ? data : data.filter(d => d[key] === this.filters[key])
  };

  filterNaN = (record) => {
    return !isNaN(Number(record[1]))
  };

  sumByKey = (acc, tup) => {
    const key = tup[0]
    const val = Number(tup[1])
    acc[key] ? acc[key] += val : acc[key] = val
    return acc
  };

}

export default Loader;
