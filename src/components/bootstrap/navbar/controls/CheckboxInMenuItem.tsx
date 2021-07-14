import './CheckboxInMenuItem.scss';
import * as React from 'react';

import InlineSVG from "riux/lib/components/inlinesvg/InlineSVG";

interface CBProps {
  status: boolean;
}
class CheckboxInMenuItem extends React.Component<CBProps> {
  public render() {
    const icon = this.props.status ? InlineSVG.CheckBoxCheckedSVG() : InlineSVG.CheckBoxSVG();
    return (
      <React.Fragment>
        <div style={{marginRight: 8, width: 16, height: 16, marginTop: -6,display: "inline-block"}}>
            {icon}
        </div>
      </React.Fragment>
    );
  }
}

export default CheckboxInMenuItem;
