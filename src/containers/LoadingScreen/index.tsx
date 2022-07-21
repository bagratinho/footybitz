import * as React from "react";
import { Box, CircularProgress, CssBaseline, useTheme } from "@mui/material";

export interface IHowToPlayProps {
  className?: string;
}

export default (props: IHowToPlayProps) =>  {
  const theme = useTheme();
  return (
    <Box
      bgcolor="background.default"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CssBaseline/>
      <CircularProgress color="primary" size={60} />
    </Box>
  );
}
