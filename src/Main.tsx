import React from "react";
import { IntlProvider } from "react-intl";
import { createTheme, ThemeProvider }  from "@mui/material/styles";
import Routes from "routes";
import AuthProvider from "context/AuthContext";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      paper: "#1e2731",
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
          backgroundImage: "none",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 24,
          paddingTop: 16,
          paddingBottom: 16,
          background: "rgba(0,0,0,0.1)",
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Main: React.FC = () => {
  return (
    <IntlProvider
      locale="en"
      formats={formats}
      defaultFormats={formats}
      onError={error => console.log("Intl :::", error)}
    >
      <ThemeProvider theme={muiTheme}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes/>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default Main;