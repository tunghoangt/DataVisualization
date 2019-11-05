/**
 * Created by ayub on 11/17/19.
 */
import React from 'react';
import BarChart from "./BarChart";
import './App.css';

/**
 * this is how to use Bar.js
 */

class BarChartApp extends React.Component {
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


    data2 = {
        state: 'New York',
        unit: 'Dolars',
        year: '2014',
        species: [
            {name: 'A', value: 100},
            {name: 'B', value: 200},
            {name: 'C', value: 300},
            {name: 'D', value: 500},
            {name: 'E', value: 745},
            {name: 'F', value: 347},
        ],
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.data1
        }
    }

    onChane = () => {
        if (this.state.data === this.data1) {
            this.setState({data: this.data2})
        } else {
            this.setState({data: this.data1})
        }
    }

    render() {
        return (
            <div className="App">
                <div>
                    <button onClick={this.onChane}>Transform</button>

                    <div style={{float: 'left', width: '600px', height: '400px'}}>
                        <BarChart id="chart1"
                             data={this.state.data}
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
                             data={this.data2}
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
        );
    }
}


export default BarChartApp;
