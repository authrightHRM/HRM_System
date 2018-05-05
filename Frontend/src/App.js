import React, { Component } from 'react';
import './App.css';
import PageRouter from './Components/pageRouter';
import StickFooter from './Components/StickFooter';

class App extends Component {
  render() {
    return (
        <div className="screen">
          <PageRouter />
          <StickFooter />
        </div>
    );
  }
}

export default App;
