import * as React from "react";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

export interface IDictionaryProps {
  label: keyof typeof messages;
  values?: any;
  renderer?: "fm" | "fhm";
}

export default class Dictionary extends React.PureComponent<IDictionaryProps> {
  public render() {
    return (
      <FormattedMessage {...messages[this.props.label]} values={this.props.values}/>
    );
  }
}
