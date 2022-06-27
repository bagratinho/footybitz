import React from "react";
import { IntlProvider } from "react-intl";
import { createTheme, ThemeProvider }  from "@mui/material/styles";
import Firebase, { FirebaseContext } from "components/Firebase";
import Routes from "routes";

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
    fontSize: 14,
    fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif`,
    h1: {
      fontWeight: "bold",
    },
    h2: {
      fontWeight: "bold",
    },
    h3: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
    },
    subtitle2: {
      fontWeight: "bold",
    },
  },
})

const formats = {
  number: {
    BTC: {
      style: "currency",
      currency: "B",
      sign: "B",
    } as any,
  },
};

console.log(muiTheme);

const Main: React.FC = () => {
  return (
    <IntlProvider
      locale="en"
      formats={formats}
      defaultFormats={formats}
      onError={error => console.log("Intl :::", error)}
    >
      <ThemeProvider theme={muiTheme}>
        <FirebaseContext.Provider value={new Firebase()}>
          <Routes/>
        </FirebaseContext.Provider>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default Main;