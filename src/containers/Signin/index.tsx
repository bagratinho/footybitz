import { Alert, Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import Dictionary from "components/Dictionary";
import messages from "components/Dictionary/messages";
import { useAuth } from "context/AuthContext";
import * as React from "react";
import { useState } from "react";
import { injectIntl } from "react-intl";

interface ISigninProps {
  intl?: any,
}

const Signin = (props: ISigninProps) => {
  const [ login, setLogin ] = useState("");
  const [ password, setPassword ] = useState("");
  const { signIn, isLoading, authMessage, resetAuthMessage } = useAuth();

  const onLoginChange = (e: any) => {
    if (authMessage) { resetAuthMessage(); }
    setLogin(e.target.value);
  }

  const onPasswordChange = (e: any) => {
    if (authMessage) { resetAuthMessage(); }
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
              variant="h3"
              mb={2}
              borderRadius={2}
              sx={{
                fontFamily: "Nunito",
                fontWeight: 800,
                textShadow: "1px 1px 0 #781df2, 2px 2px 0 #ffffff",
              }}
            >
              <Dictionary label="footybitz" />
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
              mb={0.5}
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
              mb={2}
              textAlign="right"
              sx={{ width: 300 }}
            >
              <Link
                underline="none"
                href="/password-reset"
                variant="body2"
              >
                <Dictionary
                  label="forgotPassword"
                />
              </Link>
            </Box>
            <Box
              mb={2}
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
            {authMessage === "auth/invalid-email" ?
            <Box
              mb={2}
            >
              <Alert
                severity="error"
                variant="filled"
              >
                <Dictionary
                  label="invalidEmail"
                />
              </Alert>
            </Box>
            : null}
            {authMessage === "auth/wrong-password" ?
            <Box
              mb={2}
            >
              <Alert
                severity="error"
                variant="filled"
              >
                <Dictionary
                  label="wrongPassword"
                />
              </Alert>
            </Box> : null}
            {authMessage === "auth/user-not-found" ?
            <Box
              mb={2}
            >
              <Alert
                severity="error"
                variant="filled"
              >
                <Dictionary
                  label="userNotFound"
                />
              </Alert>
            </Box> : null}
            <Box
              sx={{ width: 300 }}
            >
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
              >
                <Dictionary
                  label="newToFootybitz"
                  values={{
                    link: (
                      <Link
                        underline="none"
                        href="/signup"
                        variant="body2"
                        color="secondary"
                      >
                        <Dictionary
                          label="signUp"
                        />
                      </Link>
                    )
                  }}
                />
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default injectIntl(Signin);