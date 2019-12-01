import React from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import NewSlider from './Slider';
import BarChart from './BarChart';
import AggregationButton from './AggregationButton';

/**
 * Components:
 * 1. Radio button for aggregation (dollars || pounds) -- DONE
 * 2. Year Filter Slider -- DONE
 * 3. US Map for aggregation visualization and filter by US State
 * 4. BarChart aggregation visualization
*/
const App = () => {
  return (
    <div className="App">
      <AggregationButton />
      <NewSlider />
      <div style={{float: 'left', width: '600px', height: '400px'}}>
      <BarChart id="species" width={550} height={400} top={40} bottom={80} left={80} right={80} dataset="species"/>
      </div>
      <div style={{float: 'left', width: '600px', height: '400px'}}>
      <BarChart id="state" width={550} height={400} top={40} bottom={80} left={80} right={80} dataset="state"/>
      </div>
    </div>
  )
}

export default App;
