import * as React from "react";
import styled from "styles/styled-components";
import { Grid, Box, Typography } from "@material-ui/core";
import StickyBar from "components/StickyBar";
import PredictionsList from "./PredictionsList";

export interface IStandingsProps {
  className?: string;
}

export default (props: IStandingsProps) =>  {
  return (
    <Box>
      <StickyBar position="top">
        <Box
          display="flex"
          alignItems="center"
          minHeight={59}
          justifyContent="space-between"
          pt={1}
          pb={1}
          pr={2}
          pl={2}
          bgcolor="background.default"
          borderColor="divider"
          borderLeft={0}
          borderRight={0}
          borderTop={0}
          border={1}
        >
        <Typography variant="h6">
          Standings
        </Typography>
        </Box>
      </StickyBar>
      <Box
        pt="59px"
      >
        <PredictionsList/>
      </Box>
    </Box>
  );
}