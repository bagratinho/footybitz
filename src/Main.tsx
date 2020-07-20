import React from "react";
import Header from "./containers/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createGlobalStyle } from "styles/styled-components";
import theme from "styles/theme";
import { IntlProvider } from "react-intl";
import Interface from "containers/Interface";
import { createMuiTheme }  from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import { BrowserRouter as Router }  from "react-router-dom";
import { Link } from "react-router-dom";
import Firebase, { FirebaseContext } from "components/Firebase";

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

const Main: React.FC = () => {
  return (
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
              <Interface/>
            </div>
          </FirebaseContext.Provider>
        </ThemeProvider>

      </MuiThemeProvider>
    </IntlProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");  html,
  html > body {
    background-color: #4d4b62;
  }
`

export default Main;
