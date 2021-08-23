import * as React from "react";
import styled, { ISpacing } from "styles/styled-components";

interface IBoxProps {
  margin?: IElementSpacing[];
  padding?: IElementSpacing[];
  className?: string;
}

type IElementSpacing = ISpacing | null;

export default class Box extends React.Component<IBoxProps> {
  public render() {
    return (
      <StyledContainer
        margin={this.props.margin}
        padding={this.props.padding}
        className={this.props.className}
      >
        {this.props.children}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div<{ margin?: IElementSpacing[]; padding?: IElementSpacing[] }>`
  ${props => props.margin ?
  `margin: ${props.margin.reduce((sum, item) => `${sum ? `${sum} ` : ""}${item ? props.theme.spacing[item] : 0}px`, "")};` : "" }
  ${props => props.padding ?
  `padding: ${props.padding.reduce((sum, item) => `${sum ? `${sum} ` : ""}${item ? props.theme.spacing[item] : 0}px`, "")};` : "" }
`;
