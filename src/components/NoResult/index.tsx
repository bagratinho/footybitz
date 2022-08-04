import { Outlet, SearchOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Dictionary from "components/Dictionary";
import * as React from "react";

export interface INoResultProps {
  children?: any;
}

const NoResult = (props: INoResultProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{
        width: "100%",
        height: 300,
      }}
    >
      <SearchOff
        sx={{
          fontSize: 80,
          mb: 1,
        }}
      />
      <Typography variant="body2" color="text.secondary">
        <Dictionary label="nothingToShow"/>
      </Typography>
    </Box>
  );
}

export default NoResult;