import * as React from 'react';
import "./Key.scss"
import {connect, Dispatch} from "react-redux";
import {StartVoiceAction, StopVoiceAction} from "./actions";
import {IPianoKey} from "./reducers/audio";

interface IMappedState {
}
interface IMappedProps {
  startPlaying: () => void;
  stopPlaying: () => void;
}

interface IProps extends IMappedProps, IMappedState {
  myKey:IPianoKey,
  keyIx:number
}

class Key extends React.Component<IProps, {}> {
  constructor(props:IProps) {
    super(props);
  }

  public render() {
    return (
      <li className="Key" onClick={this.props.startPlaying}>
        <span>{this.props.myKey.label}</span>
      </li>
    );
  }
}

// const mapStateToProps = (state:IState, ownProps:IProps):IMappedState => {
//   return {
//     myKey: state.audio.keys[ownProps.keyIx]
//   }
// }

const mapDispatchToProps = (dispatch:Dispatch, ownProps:IProps):IMappedProps => {
  return {
    startPlaying: () => dispatch(new StartVoiceAction({ix: ownProps.keyIx})),
    stopPlaying: () => dispatch(new StopVoiceAction({ix: ownProps.keyIx})),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Key);