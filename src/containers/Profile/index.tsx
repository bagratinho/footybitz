import * as React from "react";
import styled from "styles/styled-components";
import { Avatar, Box, Paper, Typography } from "@material-ui/core";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";

export interface IProfileProps {
  className?: string;
}

export default (props: IProfileProps) =>  {
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
          <Dictionary label="profile"/>
        </Typography>
        </Box>
      </StickyBar>
      <Box
        pt="59px"
      >
        <Avatar
          src="https://pbs.twimg.com/profile_images/1428702978303791106/06e0QASS_400x400.jpg"
        />
      </Box>
    </Box>
  );
}