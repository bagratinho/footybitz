import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import Match from "containers/Match";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";

export interface IMatchListProps {
  className?: string;
}

export default (props: IMatchListProps) =>  {

  return (
    <>
      <Box>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
        <Match score={[2,5]}/>
      </Box>
    </>
  );
}
