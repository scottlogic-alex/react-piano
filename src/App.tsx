import * as React from 'react';
import {connect, Dispatch} from 'react-redux'
import {IState} from "./reducers";
import './App.scss';
import Keyboard from "./Keyboard";
import {CSSProperties} from "react";
import {AddVoiceAction, RemoveVoiceAction} from "./actions/audio";

interface IMappedState {
  keyCount: number;
}
interface IMappedProps {
  increaseNumber: () => void;
  decreaseNumber: () => void;
}

interface IProps extends IMappedProps, IMappedState {}

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
        <Keyboard/>
      </div>
    );
  }
}

const mapStateToProps = (state:IState):IMappedState => {
  return {
    keyCount: state.audio.keys.length
  }
}

const mapDispatchToProps = (dispatch:Dispatch):IMappedProps => {
  return {
    increaseNumber: () => dispatch(new AddVoiceAction({})),
    decreaseNumber: () => dispatch(new RemoveVoiceAction({})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);