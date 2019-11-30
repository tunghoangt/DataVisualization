import * as d3 from 'd3';
import landings from '../data/landings.csv';

class Loader {

  constructor() {
    this.filters = {
      Year: "all",
      usState: "all",
      species: "all",
      aggregateBy: "Dollars" // or "Pounds"
    }

    this.updateState.bind(this)
  }

  // TODO: we can probably merge this to make loadDataOnDelta
  updateState = (key, value) => {
    this.filters[key] = value
  }

  loadData() {
    return d3.csv(landings).then( data => {
      const filteredByYear = this.filterByKey("Year", data)
      const aggData = filteredByYear.map(x => [x["State"], x[this.filters.aggregateBy]])
                                    .filter(this.filterNaN)
                                    .reduce(this.sumByKey, {})
      return aggData;
    }).catch( err => {
      throw err
    })
  };

  filterByKey(key, data) {
    return this.filters[key] === "all" ? data : data.filter(d => d[key] === this.filters[key])
  };

  // TODO: this shouldn't be hard-coded like this (esp when loadData moves)
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
