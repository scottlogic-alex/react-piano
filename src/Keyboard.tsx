import * as React from 'react';
import Key from "./Key";

interface MyProps {
  scaleLength: number
}

interface MyState {
  // scaleDegrees: number[];
}

class Keyboard extends React.PureComponent<MyProps, MyState> {
  constructor(props:MyProps) {
    super(props);

    this.state = {
      // populate state fields according to props fields
      // scaleDegrees: Array.from(Array(props.scaleLength).keys())
    };
  }

  public render() {
    return (
      <ol className="Keyboard">
        {Array.from(Array(this.props.scaleLength).keys())
        .map(degree => <Key scaleDegree={degree} />)}
      </ol>
  );
  }
}

export default Keyboard;