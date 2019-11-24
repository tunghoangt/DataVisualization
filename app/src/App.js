import React from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import NewSlider from './Slider';
import DataHandler from './DataHandler.js';
import BarChart from './BarChart.js';

// create React Redux store where data lives (and gets passed to all visualizations)


const App = () => {
  return (
    <div className="App">
      <DataHandler />
      <NewSlider />
      <BarChart />
    </div>
  )
}

export default App;
