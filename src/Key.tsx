import * as React from 'react';

interface KeyProps {
  scaleDegree: number;
}

interface MyState {
}

class Key extends React.Component<KeyProps, MyState> {
  constructor(props:KeyProps) {
    super(props);

    this.state = {
      // populate state fields according to props fields
    };
  }

  public render() {
    return (
      <li className="Key">
        <span>{this.props.scaleDegree}</span>
      </li>
    );
  }
}

export default Key;