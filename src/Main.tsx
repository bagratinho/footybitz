import React from "react";
import Header from "./containers/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import styled, { ThemeProvider, createGlobalStyle } from "styles/styled-components";
import theme from "styles/theme";
import { IntlProvider } from "react-intl";
import Matchdays from "containers/Matchdays";
import Standings from "containers/Standings";
import Results from "containers/Results";
import HowToPlay from "containers/HowToPlay";
import { createMuiTheme }  from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import { BrowserRouter as Router, Route, Switch }  from "react-router-dom";
import Firebase, { FirebaseContext } from "components/Firebase";
import Footer from "containers/Footer";
import { Box, Container, Grid } from "@material-ui/core";
import SidebarNavigation from "containers/SidebarNavigation";

const muiTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#781df2",
    },
    secondary: {
      main: "#fff",
    },
    background: {
      default: "#15202B",
    },
    text: {
      primary: "#ffffff",
      secondary: "#8899a6",
    },
    divider: "#38444d",
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#1e2731",
      },
    },
    MuiInputBase: {
      root: {
        borderRadius: 0,
      },
    },
    MuiFilledInput: {
      root: {
        padding: 0,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#1e2731",
        "&.Mui-focused": {
          backgroundColor: "#1e2731",
        },
        "&:hover": {
          backgroundColor: "#1e2731",
        },
      },
      input: {
        padding: 8,
        paddingLeft: 16,
        lineHeight: "26px",

      },
      underline: {
        "&:after": {
          display: "none",
        },
        "&:before": {
          display: "none",
        }
      }
    },
  },
  typography: {
    fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif`,
    h6: {
      fontWeight: "bold",
    }
  },
})

const formats = {
  number: {
    "BTC": {
      style: 'currency',
      currency: 'BTC',
    },
  }
};

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");
  body {
    overflow-y: scroll;
  }
`;

const Main: React.FC = () => {
  console.log(muiTheme);
  return (
    <Router>
      <IntlProvider
        locale="en"
        formats={formats}
        defaultFormats={formats}
        onError={error => console.log("Intl :::", error)}
      >
        <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider theme={{
            ...theme,
            muiTheme,
          }}>
            <FirebaseContext.Provider value={new Firebase()}>
              <Box
                display="flex"
                flexDirection="column"
              >
                <CssBaseline/>
                <GlobalStyle/>
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
                        minHeight="100vh"
                        borderColor="divider"
                        border={1}
                        borderTop={0}
                        borderBottom={0}
                      >
                        <Switch>
                          <Route path="/" exact={true} component={Matchdays}/>
                          <Route path="/results" exact={true} component={Results}/>
                          <Route path="/standings" exact={true} component={Standings}/>
                          <Route path="/how-to-play" exact={true} component={HowToPlay}/>
                          {/* <Route path="/:lang/404" exact={true} component={AppService.getComponent("NotFound")} />
                          <Route path="/:lang?/:page?" render={({ match, location: { search } }) => <Redirect to={`/${locale}/${match.params.page ? "404" : `home${search}`}`} />} /> */}
                        </Switch>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
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
            </FirebaseContext.Provider>
          </ThemeProvider>
        </MuiThemeProvider>
      </IntlProvider>
    </Router>
  );
}

export default Main;