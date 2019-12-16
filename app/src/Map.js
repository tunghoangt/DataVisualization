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
      year: "all"
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
  }

  getDataFromStore() {
    let data = store.getState().then(
      dataObj => {
        Object.keys(dataObj).map( key =>
          this.setState({[key]: dataObj[key]})
        )
        this.setState({displayData: dataObj.stateData})
        return dataObj.stateData
      },
      error => console.log('Something went wrong.')
    )
    return data
  }

  componentDidMount() {
    this.drawMap(this.state.displayData)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.unit !== this.state.unit || prevState.year !== this.state.year) {
      this.drawMap(this.state.displayData)
    }
  }

  drawMap() {
    let data = this.state.displayData
    let maxVal = 1.0
    if (typeof data !== 'undefined') {
      for (let [key, value] of Object.entries(data)) {
        maxVal = Math.max(maxVal, value)
      }
    }

    const pathGenerator = d3.geoPath(this.projection)
    let stateVal = -1.0
    const stateMap = this.geoFeatures.map( (stateObj, i) => {
      let stateName = stateObj.properties.name.toUpperCase()
      if (typeof data !== 'undefined') {
        if (typeof data[stateName] !== 'undefined') {
          stateVal = data[stateName]
        }
      }
      let opacity = stateVal > 0.0 ? (stateVal / maxVal).toString() : "1"
      return <path key={"path" + i}
                   d={pathGenerator(stateObj)}
                   className="states"
                   stroke="black"
                   fill="red"
                   opacity={opacity}
             />
      }
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
