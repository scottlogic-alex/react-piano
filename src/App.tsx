import * as React from 'react';
import {connect, Dispatch} from 'react-redux'
import {IncreaseNumberAction} from "./actions/piano";
import './App.css';
import Keyboard from "./Keyboard";

interface IMappedProps {
  increaseNumber: () => void;
}
interface IProps extends IMappedProps {}

interface IState {
  scaleDegree: number;
}

class App extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    // console.debug(props.dispatch)

    this.state = {
      // populate state fields according to props fields
      scaleDegree: 1
    };
  }

  public render() {

    return (
      <div className="App">
        <Keyboard scaleLength={7}/>
        <input type="button" onClick={this.props.increaseNumber}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:Dispatch):IMappedProps => {
  return {
    increaseNumber: () => dispatch(new IncreaseNumberAction({amount:1}))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);