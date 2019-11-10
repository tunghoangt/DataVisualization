import React, { Component } from 'react';
import * as d3 from 'd3';
import landings from './data/landings.csv';
// FIELDS: Year, State, AFS Name, Pounds, Dollars, TSN, Collection, Confidentiality

// http://learnjsdata.com/read_data.html

class DataHandler extends Component {

  // Year, State, & AFS Name get passed in here as props --> https://reactjs.org/docs/components-and-props.html
  // we are then going to generate aggregations from those constructions
  constructor(props) {
    super(props);
    this.year = "all";
    this.USState = "all";
    this.fishName = "all";
  };

  // FILTRATIONS BY STATE
  filterByYear(data) {
    return this.year === "all" ? data : data.filter(d => d['Year'] === this.year)
  };

  filterByState(data) {
    return this.state === "all" ? data : data.filter(d => d['State'] === this.USState)
  };

  filterByFish(data) {
    return this.fishName === "all" ? data : data.filter(d => d['AFS Name'] === this.fishName)
  };

  // DATA AGGREGATIONS


  // COMPONENT
  componentDidMount() {
    d3.csv(landings).then( data => {
      console.log(this.filterByFish(data))
    }).catch( err => {
      throw err
    })
  };

  render() {
    return (
      <div className = "Data">
        <div>Viz</div>
      </div>
    );
  };

};

export default DataHandler;
