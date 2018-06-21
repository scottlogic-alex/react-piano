import * as React from 'react';
import {connect, Dispatch} from 'react-redux'
import {IncreaseNumberAction} from "./actions/piano";
import {IState} from "./reducers/index";
import './App.css';
import Keyboard from "./Keyboard";
import {CSSProperties} from "react";

interface IMappedState {
  number: number;
}
interface IMappedProps {
  increaseNumber: () => void;
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
  },
  stepper: {
    cursor: "pointer"
  }
}

class App extends React.PureComponent<IProps, {}> {
  constructor(props:IProps) {
    super(props);
    // console.debug(props.dispatch)

    // this.state = {
    //   // populate state fields according to props fields
    //   scaleDegree: 1
    // };
  }

  public render() {

    // var styles = { textAlign: "center" };


    return (
      <div style={{...style.container}}>
        <span>{this.props.number}</span>
        <label className="stepper" htmlFor="increaseNumber">[+]</label>
        <input style={{...style.hide}} id="increaseNumber" type="button" onClick={this.props.increaseNumber}/>
        <Keyboard scaleLength={this.props.number}/>
      </div>
    );
  }
}

const mapStateToProps = (state:IState):IMappedState => {
  return {
    number: state.piano.number
  }
}

const mapDispatchToProps = (dispatch:Dispatch):IMappedProps => {
  return {
    increaseNumber: () => dispatch(new IncreaseNumberAction({amount:1}))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);