import * as React from "react";
import styled from "styles/styled-components";

export interface IContainerProps {
  children?: any;
}

const Container = (props: IContainerProps) => {
  return (
    <StyledContainer>
      {props.children}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
`;

export default Container;