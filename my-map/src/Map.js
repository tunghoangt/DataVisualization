

import React, { Component } from "react";

class Map extends Component {
  render() {
    return (
      <path d={this.props.dimensions} fill={this.props.fill} data-name={this.props.state} className={`${this.props.state} state`} onClick={this.props.onClickState}>
        <title>{props.stateName}</title>
      </path>
    )
  }
};

export default Map;
