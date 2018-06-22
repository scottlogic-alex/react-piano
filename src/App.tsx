import * as React from 'react';
import {connect, Dispatch} from 'react-redux'
import {IncreaseKeysAction} from "./actions/piano";
import {IState} from "./reducers/index";
import './App.scss';
import Keyboard from "./Keyboard";
import {CSSProperties} from "react";

interface IMappedState {
  keyCount: number;
}
interface IMappedProps {
  increaseNumber: () => void;
  decreaseNumber: () => void;
}

interface IProps extends IMappedProps, IMappedState {}

// interface IState {
//   scaleDegree: number;
// }

const style: { [ _: string ]: CSSProperties } = {
  container: {
  },
  hide: {
    display: "none"
  }
}

class App extends React.PureComponent<IProps, {}> {
  constructor(props:IProps) {
    super(props);
  }

  public render() {

    return (
      <div style={{...style.container}}>
        <span className="keyCount">{this.props.keyCount}</span>
        <label className="stepper" htmlFor="increaseNumber">[+]</label>
        <label className="stepper" htmlFor="decreaseNumber">[-]</label>
        <input style={{...style.hide}} id="increaseNumber" type="button" onClick={this.props.increaseNumber}/>
        <input style={{...style.hide}} id="decreaseNumber" type="button" onClick={this.props.decreaseNumber}/>
        <Keyboard keys={this.props.keyCount} scaleLength={7}/>
      </div>
    );
  }
}

const mapStateToProps = (state:IState):IMappedState => {
  return {
    keyCount: state.piano.keyCount
  }
}

const mapDispatchToProps = (dispatch:Dispatch):IMappedProps => {
  return {
    increaseNumber: () => dispatch(new IncreaseKeysAction({amount:1})),
    decreaseNumber: () => dispatch(new IncreaseKeysAction({amount:-1})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);