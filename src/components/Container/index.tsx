import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

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

const StyledContainer = styled(Box)`
  margin: 0 auto;
  width: 1200px;
`;

export default Container;