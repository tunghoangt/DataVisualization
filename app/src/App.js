import React from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import NewSlider from './Slider';
import BarChart from './BarChart';

/**
 * Components:
 * 1. Radio button for aggregation (dollars || pounds)
 * 2. Year Filter Slider
 * 3. US Map for aggregation visualization and filter by US State
 * 4. BarChart aggregation visualization
*/

class App extends React.Component {
  data1 = {
        state: 'New York',
        unit: 'Pounds',
        year: '2015',
        species: [
            {name: 'MBERJACK, GREATER', value: 2000},
            {name: 'AMBERJACK, LESSER', value: 2100},
            {name: 'ATLANTIC BUMPER', value: 2300},
            {name: 'BARRACUDAS', value: 1500},
            {name: 'BARRELFISH', value: 1745},
            {name: 'BIGEYE', value: 2347},
        ],
    };

}

const App = () => {


  return (
    <div className="App">
      <NewSlider />
      <div>
      <div style={{float: 'left', width: '600px', height: '400px'}}>
          <BarChart id="chart1"
               data={this.data1}
               width={550}
               height={400}
               top={50}
               bottom={80}
               left={80}
               right={40}
          />
    </div>
    <div style={{float: 'left', width: '600px', height: '400px'}}>
          <BarChart id="chart2"
               data={this.data1}
               width={550}
               height={400}
               top={50}
               bottom={80}
               left={80}
               right={40}
          />
    </div>
</div>
    </div>
  )
}

export default App;
