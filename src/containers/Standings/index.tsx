import * as React from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import StickyBar from "components/StickyBar";
import PredictionsList from "./PredictionsList";
import Dictionary from "components/Dictionary";
import PageWrapper from "containers/PageWrapper";
import { transparentize } from "utils"

export interface IStandingsProps {
  className?: string;
}

export default (props: IStandingsProps) =>  {
  const theme = useTheme();
  return (
    <PageWrapper>
      <Box>
        <StickyBar position="top">
          <Box
            pt={1}
            pb={1}
            pr={2}
            pl={2}
            sx={{
              color: "divider",
              borderBottom: "1px solid",
              minHeight: "59px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: transparentize(theme.palette.background.default, 0.8),
              backdropFilter: "blur(12px)",
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