import React from "react";
import Header from "./containers/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import styled, { ThemeProvider, createGlobalStyle } from "styles/styled-components";
import theme from "styles/theme";
import { IntlProvider } from "react-intl";
import Interface from "containers/Interface";
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
    primary: {
      main: "#4f8a8b",
    },
    secondary: {
      main: "#fbd46d",
    },
  },
})

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");
  html > body {
    background-color: #4d4b62;
  }
`;

const Main: React.FC = () => {
  return (
    <Router>
      <IntlProvider
        locale="en"

        onError={error => console.log("Intl :::", error)}
      >
        <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider theme={theme}>
            <FirebaseContext.Provider value={new Firebase()}>
              <div className="app-main-wrapper">
                <CssBaseline/>
                <GlobalStyle/>
                <Header/>
                  <StyledContainer>
                    <Container>
                      <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                          <SidebarNavigation/>
                        </Grid>
                        <Grid item xs={6}>
                          <Switch>
                            <Route path="/" exact={true} component={Interface}/>
                            <Route path="/results" exact={true} component={Results}/>
                            <Route path="/standings" exact={true} component={Standings}/>
                            <Route path="/how-to-play" exact={true} component={HowToPlay}/>
                            {/* <Route path="/:lang/404" exact={true} component={AppService.getComponent("NotFound")} />
                            <Route path="/:lang?/:page?" render={({ match, location: { search } }) => <Redirect to={`/${locale}/${match.params.page ? "404" : `home${search}`}`} />} /> */}
                          </Switch>
                        </Grid>
                        <Grid item xs={3}>
                          <div className="">
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
                          </div>
                        </Grid>
                      </Grid>
                    </Container>
                  </StyledContainer>
                <Footer/>
              </div>
            </FirebaseContext.Provider>
          </ThemeProvider>

        </MuiThemeProvider>
      </IntlProvider>
    </Router>
  );
}

const StyledContainer = styled(Box)`
  margin-bottom: 40px;
  min-height: calc(100vh - 160px);

  & .main-panel {
    background: #3e3c4e;
    & .main-panel-header {
      background: #4f8a8b;
      color: #fff;
      background-color: #363544;
      padding: 8px 16px;
    }
    & .main-panel-inner {
      padding: 8px 16px;
    }
  }
`;

export default Main;