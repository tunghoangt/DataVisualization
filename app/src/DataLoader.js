import React, { Component } from 'react';
import * as d3 from 'd3';
import landings from './data/landings.csv';
// FIELDS: Year, State, AFS Name, Pounds, Dollars, TSN, Collection, Confidentiality

// https://reactjs.org/docs/lifting-state-up.html

class Loader {

  constructor() {
    this.state = {
      year: "all",
      usState: "all",
      species: "all",
      aggregateBy: "dollars"
    }
  }

  loadData() {
    d3.csv(landings).then( data => {
      let aggData = data.map(x => [x["State"], x[this.state.aggregateBy]])
                        .filter(this.filterNaN)
                        .reduce(this.sumByKey, {});
      console.log(aggData)
      return(aggData);
    }).catch( err => {
      throw err
    })
  }

}

class DataLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      year: "all",
      usState: "all",
      fish: "all",
      aggregateBy: "Dollars" // or Pounds
    }

    this.handleChange = this.handleChange.bind(this)
  };

  // TODO: how to deal with invalid input?
  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  // FILTRATIONS BY STATE
  // TODO: these can be made generic (i.e. should just be in some componentUpdate function)
  filterByYear(data) {
    return this.state.year === "all" ? data : data.filter(d => d['Year'] === this.state.year)
  };

  filterByState(data) {
    return this.state.usState === "all" ? data : data.filter(d => d['State'] === this.state.usState)
  };

  filterByFish(data) {
    return this.state.fish === "all" ? data : data.filter(d => d['AFS Name'] === this.state.fish)
  };

  filterNaN = (record) => {
    return !isNaN(Number(record[1]))
  }

  // DATA AGGREGATIONS
  // TODO: some of the state names are messy
  sumByKey = (acc, tup) => {
    const key = tup[0]
    const val = Number(tup[1])
    acc[key] ? acc[key]+= val : acc[key] = val
    return acc
  }

  componentDidMount() {
    d3.csv(landings).then( data => {
      let aggData = data.map(x => [x["State"], x[this.state.aggregateBy]])
                        .filter(this.filterNaN)
                        .reduce(this.sumByKey, {});
      console.log(aggData)
    }).catch( err => {
      throw err
    })
  };

  render() {
    return (
      <div className = "Data">
        <form>
          <label>
            Set year:
              <input
                name="year"
                type="text"
                value={this.state.year}
                onChange={this.handleChange}
              />
          </label>
        </form>
        <form>
          <label>
            Set US State:
              <input
                name="usState"
                type="text"
                value={this.state.usState}
                onChange={this.handleChange}
              />
          </label>
        </form>
        <form>
          <label>
            Set Fish:
              <input
                name="fish"
                type="text"
                value={this.state.fish}
                onChange={this.handleChange}
              />
          </label>
        </form>
        <div>The year is {this.state.year}</div>
        <div>The state is {this.state.usState}</div>
        <div>The fish is {this.state.fish}</div>
      </div>
    );
  };

};

export default DataLoader;
