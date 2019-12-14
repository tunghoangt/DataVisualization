import React, { Component } from 'react';
import * as d3 from "d3";
import mapStateToProps from './redux/helpers';
import store from './redux/store';
import { connect } from 'react-redux';
import { geoMercator, geoPath } from 'd3-geo';
// import { csv } from "d3-fetch";
import { scaleThreshold, scaleQuantize } from 'd3-scale';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: "Pounds",
      year: "all",
      displayData: store.getState().then(
        dataObj => {
          Object.keys(dataObj).map( key =>
            this.setState({[key]: dataObj[key]})
          )
          return dataObj.stateData
        },
        error => console.log('Something went wrong')
      )
    }

    store.subscribe(() => this.getDataFromStore());
    this.getDataFromStore = this.getDataFromStore.bind(this);
  }

  getDataFromStore() {
    store.getState().then(
      dataObj => {
        Object.keys(dataObj).map( key =>
          this.setState({[key]: dataObj[key]})
        )
        this.setState({displayData: dataObj.stateData})
      },
      error => console.log('Something went wrong.')
    )
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: there are several other fields getting returned here? clean up
    if (prevState.unit !== this.state.unit || prevState.year !== this.state.year) {
      this.getDataFromStore()
    }
  }

  componentDidMount() {
    this.getDataFromStore()
  }

  render() {
    return(
      <div id="Map">
      </div>
    )
  }

}

export default connect(mapStateToProps)(Map);
