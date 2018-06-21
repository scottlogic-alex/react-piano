import * as React from 'react';
import "./Key.scss"

interface IProps {
  label: string;
}

class Key extends React.PureComponent<IProps, {}> {
  constructor(props:IProps) {
    super(props);
  }

  public render() {
    return (
      <li className="Key">
        <span>{this.props.label}</span>
      </li>
    );
  }
}

export default Key;