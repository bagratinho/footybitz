import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";
import StickyBar from "components/StickyBar";
import PredictionsList from "./PredictionsList";
import Dictionary from "components/Dictionary";
import PageWrapper from "containers/PageWrapper";

export interface IStandingsProps {
  className?: string;
}

export default (props: IStandingsProps) =>  {
  return (
    <PageWrapper>
      <Box>
        <StickyBar position="top">
          <Box
            pt={1}
            pb={1}
            pr={2}
            pl={2}
            bgcolor="background.default"
            sx={{
              color: "divider",
              borderBottom: "1px solid",
              minHeight: "59px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="h2" color="text.primary">
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
    </PageWrapper>
  );
}