import * as React from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import Loading from "components/Loading";

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
        width: "100%",
        position: "fixed",
      }}
    >
      <CssBaseline/>
      <Loading/>
    </Box>
  );
}
