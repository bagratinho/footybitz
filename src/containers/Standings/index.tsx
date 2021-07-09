import * as React from "react";
import styled from "styles/styled-components";
import Box from "components/Box";
import { Grid } from "@material-ui/core";

export interface IStandingsProps {
  className?: string;
}

export default (props: IStandingsProps) =>  {
  return (
    <StyledContainer>
      <div className="main-panel">
        <div className="main-panel-header">
          <div className="filter-bar">
            Standings
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