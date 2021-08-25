import * as React from "react";
import styled from "styles/styled-components";
import { Grid, Box, Typography } from "@material-ui/core";

export interface IStandingsProps {
  className?: string;
}

export default (props: IStandingsProps) =>  {
  return (
    <Box>
      <Box
        height={60}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pt={1}
        pb={1}
        pr={2}
        pl={2}
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
      <Box>
      </Box>
    </Box>
  );
}