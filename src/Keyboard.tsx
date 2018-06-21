import * as React from 'react';
import Key from "./Key";
import "./Keyboard.css"

interface IProps {
  scaleLength: number
}

class Keyboard extends React.Component<IProps, {}> {
  constructor(props:IProps) {
    super(props);

    // this.state = {
      // populate state fields according to props fields
      // scaleDegrees: Array.from(Array(props.scaleLength).keys())
    // };
  }

  public render() {
    const scaleDegrees = Array.from(Array(this.props.scaleLength).keys())
    return (
      <ol className="Keyboard">
        {scaleDegrees.map(deg => <Key scaleDegree={deg} key={deg} />)}
      </ol>
  );
  }
}

export default Keyboard;