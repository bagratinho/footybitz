import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { IntlProvider } from "react-intl";
import Matchdays from "containers/Matchdays";
import Standings from "containers/Standings";
import Results from "containers/Results";
import Profile from "containers/Profile";
import HowToPlay from "containers/HowToPlay";
import { createTheme, ThemeProvider }  from "@mui/material/styles";
import Firebase, { FirebaseContext } from "components/Firebase";
import { Box, Container, GlobalStyles, Grid } from "@mui/material";
import SidebarNavigation from "containers/SidebarNavigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'styles/css/global.css';

const muiTheme = createTheme({
  palette: {
    mode: "dark",
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
  components: {
    MuiList: {
      styleOverrides: {
        padding: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "solid 1px #38444d",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e2731",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
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
    BTC: {
      style: "currency",
      currency: "BTC",
    } as any,
  },
};

const globalStyles = <GlobalStyles styles={{

}} />

const Main: React.FC = () => {
  return (
    <Router>
      <IntlProvider
        locale="en"
        formats={formats}
        defaultFormats={formats}
        onError={error => console.log("Intl :::", error)}
      >
        <ThemeProvider theme={muiTheme}>
          <FirebaseContext.Provider value={new Firebase()}>
            <Box
              display="flex"
              flexDirection="column"
            >
              <CssBaseline/>
              {globalStyles}
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
                      <Switch>
                        <Route exact={true} path="/" component={Matchdays}/>
                        <Route exact={true} path="/results" component={Results}/>
                        <Route exact={true} path="/standings" component={Standings}/>
                        <Route exact={true} path="/how-to-play" component={HowToPlay}/>
                        <Route exact={true} path="/how-to-play" component={HowToPlay}/>
                        <Route exact={true} path="/profile" component={Profile}/>
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
      </IntlProvider>
    </Router>
  );
}

export default Main;