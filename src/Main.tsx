import React from "react";
import { IntlProvider } from "react-intl";
import { createTheme, ThemeProvider }  from "@mui/material/styles";
import Routes from "routes";
import AuthProvider from "context/AuthContext";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const colors = {
  primary: "#781df2",
  secondary: "#fff",
  backgroundDefault: "#15202B",
  backgroundPaper: "#1e2731",
  textPrimary: "#fff",
  textSecondary: "#8899a6",
  divider: "#38444d",
}

const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
    },
    text: {
      primary: colors.secondary,
      secondary: colors.textSecondary,
    },
    divider: colors.divider,
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
          borderBottom: `solid 1px ${ colors.divider}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundPaper,
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
          background: colors.backgroundDefault,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          background: colors.backgroundDefault,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: "20px !important",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(5px)",
        }
      }
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
          backgroundColor: colors.backgroundPaper,
          "&.Mui-focused": {
            backgroundColor: colors.backgroundPaper,
          },
          "&:hover": {
            backgroundColor: colors.backgroundPaper,
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
      refetchOnMount: false,
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
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes/>
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default Main;