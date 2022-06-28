import { PropaneSharp } from "@mui/icons-material";
import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import Dictionary from "components/Dictionary";
import messages from "components/Dictionary/messages";
import { useAuth } from "context/AuthContext";
import * as React from "react";
import { useState } from "react";
import { injectIntl } from "react-intl";
import logo from "./logo.png";

interface ILoginProps {
  intl?: any,
}

const Routes = (props: ILoginProps) => {
  const [ login, setLogin ] = useState("");
  const [ password, setPassword ] = useState("");
  const { signIn, isLoading, authError, resetAuthError } = useAuth();
  const onLoginChange = (e: any) => {
    if (authError) { resetAuthError(); }
    setLogin(e.target.value);
  }
  const onPasswordChange = (e: any) => {
    if (authError) { resetAuthError(); }
    setPassword(e.target.value);
  }
  const onSubmit = () => {
    if (login && password) {
      signIn(login, password)
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            display: "flex",
            height: 500,
            background: "transparent",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "primary.main",
              width: 300,
              borderRadius: "20px 0 0 20px"
            }}
            p={4}
          >
            <Typography
              component="h1"
              mb={2}
              borderRadius={2}
              bgcolor="background.default"
              sx={{
                padding: "20px 20px 15px 20px",
              }}
            >
              <img src={logo} style={{ maxWidth: "100%" }}/>
            </Typography>
            <Typography variant="body2" align="center">
              <Dictionary label="logoSlogan"/>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "background.default",
              width: 500,
              borderRadius: "0 20px 20px 0"
            }}
            p={2}
          >
            <Typography variant="h5" align="center" mb={3}>
              <Dictionary label="signInTo"/>
            </Typography>
            <Box
              mb={1}
            >
              <TextField
                size="medium"
                placeholder={props.intl.formatMessage(messages.email)}
                variant="outlined"
                value={login}
                onChange={onLoginChange}
                type="text"
                sx={{ width: 300 }}
              />
            </Box>
            <Box
              mb={2}
            >
              <TextField
                size="medium"
                placeholder={props.intl.formatMessage(messages.password)}
                variant="outlined"
                value={password}
                onChange={onPasswordChange}
                type="password"
                sx={{ width: 300 }}
              />
            </Box>
            <Box
              mb={1}
            >
              <Button
                size="large"
                disableElevation
                variant="contained"
                onClick={onSubmit}
                sx={{ width: 300 }}
                disabled={isLoading}
              >
                <Dictionary label="signIn"/>
              </Button>
            </Box>
            <Box>
              <Button
                size="large"
                disableElevation
                variant="text"
                onClick={onSubmit}

                sx={{ width: 300 }}
                color="info"
              >
                <Dictionary label="forgotPassword"/>
              </Button>
            </Box>
            {authError ?
            <Box mt={2}>
              <Alert severity="error" variant="filled">This is an error alert — check it out!</Alert>
            </Box> : null}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default injectIntl(Routes);