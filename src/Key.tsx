import * as React from 'react';

interface IProps {
  scaleDegree: number;
}

class Key extends React.PureComponent<IProps, {}> {
  constructor(props:IProps) {
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