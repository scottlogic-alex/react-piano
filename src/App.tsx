import * as React from 'react';
import './App.css';
import Keyboard from "./Keyboard";

import logo from './logo.svg';

interface MyProps {}

interface MyState {
  scaleDegree: number;
}

class App extends React.Component<MyProps, MyState> {
  constructor(props:MyProps) {
    super(props);

    this.state = {
      // populate state fields according to props fields
      scaleDegree: 1
    };
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Keyboard scaleLength={7}/>
      </div>
    );
  }
}

export default App;