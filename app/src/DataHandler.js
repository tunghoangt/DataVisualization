import React, { Component } from 'react';
import Papa from 'papaparse';

class DataHandler extends Component {

  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    let csvPath = require('./data/landings.csv');
    Papa.parse(csvPath, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: this.loadData
    })
  }

  loadData(result) {
    const data = result.data;
    this.setState({data: data})
  }

  render() {
    return <div>Data</div>
  }

}

export default DataHandler;
