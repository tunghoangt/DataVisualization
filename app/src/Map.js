import React, { Component } from 'react'
import './App.css'
import { geoMercator, geoPath } from 'd3-geo';
import us_States from './usa_states.json';
// import { csv } from "d3-fetch";
// import land from './land.csv';
import { scaleThreshold, scaleQuantize } from 'd3-scale';

class Map extends Component {

  drawMap() {

    // us_States.forEach(functio(state_i, state_e){           ////This part is where we hhave to merge the info belonging to each state
    //   this.props.data.forEach(function(land_i, land_e){
    //     if (state_i.properties.postal !== land_i.State) {
    //       return null;
    //     }
    //     us_States.features[state_e].pounds = parseInt(land_i.Pounds)
    //   });
    // })

    const projection = geoMercator()
      .scale(250)
      .translate([800, 500])
    const pathGenerator = geoPath().projection(projection)

    const colorScale = scaleThreshold()
                    .domain([5,10,20,30,50])
                    .range(["#75739F", "#5EAFC6", "#41A368", "#93C464", "#FE9922"]);

    const usStates = us_States.features
      .map((d,i) => <path
        key={"path" + i}
        d={pathGenerator(d)}
        // style={{fill: colorScale(d.pounds),        // colorScale(d.pounds)
        //     stroke: "grey", strokeOpacity: 0.5 }}
        className="usStates"
      />)
      return <svg width={800} height={500}>
        {usStates}
      </svg>
  }
  render() {

    return this.drawMap()

  }
}

export default Map;
