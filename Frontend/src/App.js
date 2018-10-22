import React, { Component } from 'react';
import './App.css';
import PageRouter from './components/pageRouter';
import StickFooter from './components/stickFooter';

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
