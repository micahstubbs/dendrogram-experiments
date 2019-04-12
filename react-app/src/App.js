import React, { Component } from 'react';
import './App.css';
import Dendrogram from './components/Dendrogram/'
import data from './data/analytics.json'

class App extends Component {
  render() {
    const width = 960
    const height = 500
    return (
      <div className="App">
        <svg width={width} height={height} id="svg">
          <Dendrogram x={0} y={0} width={width} height={height} data={data} />
        </svg>
      </div>
    );
  }
}

export default App;
