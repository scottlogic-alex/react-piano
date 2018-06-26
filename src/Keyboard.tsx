import * as React from 'react';
import Key from "./Key";
import "./Keyboard.scss"
import {connect} from "react-redux";
import {IState} from "./reducers";
import {IPianoKey} from "./reducers/audio";

interface IMappedState {
  keys: IPianoKey[]
}
interface IMappedProps {}

interface IProps extends IMappedProps, IMappedState {}

class Keyboard extends React.Component<IProps, {}> {
  constructor(props:IProps) {
    super(props);
  }

  public render() {
    return (
      <ol className="Keyboard">
        {this.props.keys.map((key:IPianoKey, ix:number) => <Key myKey={key} keyIx={ix} key={ix} />)}
      </ol>
  );
  }
}

const mapStateToProps = (state:IState):IMappedState => {
  return {
    keys: state.audio.keys
  }
}

export default connect(mapStateToProps)(Keyboard);