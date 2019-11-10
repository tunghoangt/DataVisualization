import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataHandler from './DataHandler.js'

// https://reactjs.org/docs/faq-state.html

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <DataHandler />
    </div>
  );
}

export default App;
