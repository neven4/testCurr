import React, { Component } from 'react';
import './App.css';

import Table from './Components/Tab/Tab';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='table-holder'>
          <Table />
        </div>
        
      </div>
    );
  }
}

export default App;
