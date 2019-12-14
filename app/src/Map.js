import React, { Component } from 'react';
import * as d3 from 'd3';
import mapStateToProps from './redux/helpers';
import store from './redux/store';
import { connect } from 'react-redux';
import features from './data/us_states.json';

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
    this.geoFeatures = features.features
    this.height = 500
    this.width = 960
    this.projection = d3.geoAlbersUsa()
				                .translate([this.width/2, this.height/2])
				                .scale([1000]);

    store.subscribe(() => this.getDataFromStore());
    this.getDataFromStore = this.getDataFromStore.bind(this);
    this.drawMap = this.drawMap.bind(this);
    this.drawMap()
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
    this.drawMap()
  }

  componentDidMount() {
    this.getDataFromStore()
    this.drawMap()
  }

  // calculateSaturation(d) {
  //  get max
  //  represent as % of max
  // }

  drawMap() {
    const pathGenerator = d3.geoPath(this.projection)
    const stateMap = this.geoFeatures.map( (d, i) =>
      <path key={"path" + i} d={pathGenerator(d)} className="states"/>
    )
    return <svg width={this.width} height={this.height}>{stateMap}</svg>
  }

  render() {
    return(
      <div id="Map">
      {this.drawMap()}
      </div>
    )
  }

}

export default connect(mapStateToProps)(Map);
