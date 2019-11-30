import React from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import NewSlider from './Slider';
import BarChart from './BarChart';
import AggregationButton from './AggregationButton';

/**
 * Components:
 * 1. Radio button for aggregation (dollars || pounds)
 * 2. Year Filter Slider -- DONE
 * 3. US Map for aggregation visualization and filter by US State
 * 4. BarChart aggregation visualization
*/
const App = () => {
  return (
    <div className="App">
      <AggregationButton />
      <NewSlider />
    </div>
  )
}

export default App;
