import * as React from 'react';
import Key from "./Key";
import "./Keyboard.scss"

interface IProps {
  keys: number,
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
    const notes = Array.from(Array(this.props.keys).keys())
    .map((index:number) => {
      const labelOffset:number = 2;
      return {
        index,
        label: String.fromCharCode(65 + ((index + labelOffset) % this.props.scaleLength)),
        scaleDegree: index
      }
    })
    return (
      <ol className="Keyboard">
        {notes.map(note => <Key label={note.label} key={note.index} />)}
      </ol>
  );
  }
}

export default Keyboard;