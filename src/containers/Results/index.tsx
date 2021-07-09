import * as React from "react";
import styled from "styles/styled-components";
import Box from "components/Box";
import { Grid } from "@material-ui/core";

export interface IResultsProps {
  className?: string;
}

export default (props: IResultsProps) =>  {
  return (
    <StyledContainer>
      <div className="main-panel">
        <div className="main-panel-header">
          <div className="filter-bar">
            Results
          </div>
        </div>
        <div className="main-panel-inner">
        </div>
      </div>
    </StyledContainer>
  );
}


const StyledContainer = styled(Box)`
`;