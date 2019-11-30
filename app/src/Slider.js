import React, { Component } from "react";
import changeYear from './redux/actions';
import mapStateToProps from './redux/helpers';
import { connect } from 'react-redux';
import { render } from "react-dom";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Handle, Track, Tick } from "./SliderComponents";
import { format } from "date-fns";
import { scaleTime } from "d3-scale";

// TODO: this just needs a dispatch action to change the year, doesn't need to subscribe

const sliderStyle = {
  position: "relative",
  width: "100%"
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 8,
  borderRadius: 4,
  cursor: "pointer",
  backgroundColor: "rgb(100,100,100)"
};


function formatTick(ms) {
  return format(new Date(ms), "yyyy");
}

const oneYear = 1000 * 60 * 60 * 24 * 365;

/**
  * A slider which controls the year (dispatchs actions), but does not subscribe to redux store.
  */
class NewSlider extends Component {
	constructor(props) {
	    super(props);

	   	const defaultYear = new Date(1950, 3, 3);
	    const startYear = new Date(1950, 3, 3);
	    const endYear = new Date(2019, 3, 3);

	    this.state = {
	      selected: defaultYear,
	      updated: defaultYear,
	      min: startYear,
	      max: endYear
	    };

	  	this.onChange = this.onChange.bind(this)
	  }


    // TODO: this dispatchs the change year action
	  onChange = ([ms]) => {
	    this.setState({
	      selected: new Date(ms)
	    });
	  };

	  onUpdate = ([ms]) => {
	    this.setState({
	      updated: new Date(ms)
	    });
	  };

	  renderDateTime(date, header) {
	    return (
	      <div
	        style={{
	          width: "100%",
	          textAlign: "center",
	          fontFamily: "Arial",
	          margin: 5
	        }}
	      >
	        <b>{header}:</b>
	        <div style={{ fontSize: 12 }}>{format(date, "yyyy")}</div>
	      </div>
	    );
	  }

	  render() {
	    const { min, max, selected, updated } = this.state;

	    const dateTicks = scaleTime()
	      .domain([min, max])
	      .ticks(10)
	      .map(d => +d);

	    return (
	      <div>
	        {this.renderDateTime(selected, "Selected")}
	        <div style={{ margin: "5%", height: 120, width: "90%" }}>
	          <Slider
	            step={oneYear}
	            domain={[+min, +max]}
	            rootStyle={sliderStyle}
	            onUpdate={this.onUpdate}
	            onChange={this.onChange}
	            values={[+selected]}
	          >
            <Rail>
              {({ getRailProps }) => (
                <div style={railStyle} {...getRailProps()} />
              )}
            </Rail>
	            <Handles>
	              {({ handles, getHandleProps }) => (
	                <div>
	                  {handles.map(handle => (
	                    <Handle
	                      key={handle.id}
	                      handle={handle}
	                      domain={[+min, +max]}
	                      getHandleProps={getHandleProps}
	                    />
	                  ))}
	                </div>
	              )}
	            </Handles>
	            <Tracks right={false}>
	              {({ tracks, getTrackProps }) => (
	                <div>
	                  {tracks.map(({ id, source, target }) => (
	                    <Track
	                      key={id}
	                      source={source}
	                      target={target}
	                      getTrackProps={getTrackProps}
	                    />
	                  ))}
	                </div>
	              )}
	            </Tracks>
	            <Ticks values={dateTicks}>
	              {({ ticks }) => (
	                <div>
	                  {ticks.map(tick => (
	                    <Tick
	                      key={tick.id}
	                      tick={tick}
	                      count={ticks.length}
	                      format={formatTick}
	                    />
	                  ))}
	                </div>
	              )}
	            </Ticks>
	          </Slider>
	        </div>
	      </div>
	    );
	  }
}

export default connect(mapStateToProps)(NewSlider)
