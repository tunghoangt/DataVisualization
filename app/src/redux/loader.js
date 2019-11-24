import * as d3 from 'd3';
import landings from '../data/landings.csv';

class Loader {

  constructor() {
    this.filters = {
      year: "all",
      usState: "all",
      species: "all",
      aggregateBy: "dollars"
    }
  }

  // TODO: remove hard-coded "State"
  loadData(year, usState, species, aggregateBy) {
    d3.csv(landings).then( data => {
      let aggData = data.map(x => [x["State"], x[this.filters.aggregateBy]])
                        .filter(this.filterNaN)
                        .reduce(this.sumByKey, {})
      return aggData ;
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
    acc[key] ? acc[key]+= val : acc[key] = val
    return acc
  };

}

export default Loader;
