import Measure from "react-measure";
import * as React from "react";

interface IMeasurer {
  className?: string;
  onMeasure: (bounds: any) => void;
}

export default class Measurer extends React.Component<IMeasurer> {
  public render() {
    return (
      <Measure
        bounds
        onResize={this.onResize}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className={this.props.className}
          >
            {this.props.children}
          </div>
        )}
      </Measure>
    );
  }

  private onResize = (contentRect: any) => this.props.onMeasure(contentRect.bounds);
}
