import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import SidebarNavigation from "containers/SidebarNavigation";
import Dictionary from "components/Dictionary";
import { useAuth } from "context/AuthContext";

const PageWrapper: React.FC = (props: any) => {
  const { signOut } = useAuth();
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
            <Button
              onClick={signOut}
            >
              <Dictionary label="signOut"/>
            </Button>
            {/* <Header/> */}
            {/* <div className="">
              <div>Matchday prize pool</div>
              <div>$15.000</div>
            </div>
            <div className="">
              <div>Season prize pool</div>
              <div>$65.000</div>
            </div>
            <div className="">
              <div>Season Leaders</div>
              <div>Lorem</div>
              <div>Ipsum</div>
              <div>Dolor</div>
            </div> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PageWrapper;