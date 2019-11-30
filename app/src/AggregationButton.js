import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './redux/helpers';
import { changeUnit } from './redux/actions';

class AggregationButton extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      aggregateBy: "Pounds"
    }
  }

  handleChange = (event) => {
    const unit = event.target.value
    this.setState({
      aggregateBy: unit
    })
    this.props.dispatch(changeUnit(unit))
  }

  render() {
    return(
      <ul>
        <li>
          <label>
            <input
              type='radio'
              value='Pounds'
              checked={this.state.aggregateBy === "Pounds"}
              onChange={this.handleChange}
            />
            Pounds
          </label>
        </li>

        <li>
          <label>
            <input
              type='radio'
              value='Dollars'
              checked={this.state.aggregateBy === 'Dollars'}
              onChange={this.handleChange}
            />
            Dollars
          </label>
        </li>
      </ul>
    )
  }

}

export default connect(mapStateToProps)(AggregationButton)
