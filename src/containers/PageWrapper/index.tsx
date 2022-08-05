import React from "react";
import { Box, Container, Grid } from "@mui/material";
import SidebarNavigation from "containers/SidebarNavigation";
import UserWidget from "containers/UserWidget";

const PageWrapper: React.FC = (props: any) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
    >
      <Container>
        <Grid container alignItems="flex-start">
          <Grid item xs={3}>
            <Box
              position="fixed"
              height={0}
            >
              <SidebarNavigation/>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                minHeight: "100vh",
                color: "divider",
                borderLeft: "1px solid",
                borderRight: "1px solid",
              }}
            >
              {props.children}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <UserWidget/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PageWrapper;