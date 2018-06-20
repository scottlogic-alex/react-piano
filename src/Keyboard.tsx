import * as React from 'react';
import Key from "./Key";

interface IProps {
  scaleLength: number
}

class Keyboard extends React.PureComponent<IProps, {}> {
  private readonly scaleDegrees:number[]
  constructor(props:IProps) {
    super(props);

    // this.state = {
      // populate state fields according to props fields
      // scaleDegrees: Array.from(Array(props.scaleLength).keys())
    // };
    this.scaleDegrees = Array.from(Array(this.props.scaleLength).keys())
  }

  public render() {
    return (
      <ol className="Keyboard">
        {this.scaleDegrees.map(deg => <Key scaleDegree={deg} key={deg} />)}
      </ol>
  );
  }
}

export default Keyboard;