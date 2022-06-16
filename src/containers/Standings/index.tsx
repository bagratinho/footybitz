import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";
import StickyBar from "components/StickyBar";
import PredictionsList from "./PredictionsList";
import Dictionary from "components/Dictionary";

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
          <Dictionary label="standings"/>
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