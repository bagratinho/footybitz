import { Alert, Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import Dictionary from "components/Dictionary";
import messages from "components/Dictionary/messages";
import { useAuth } from "context/AuthContext";
import * as React from "react";
import { useState } from "react";
import { injectIntl } from "react-intl";

interface IPasswordResetProps {
  intl?: any,
}

const PasswordReset = (props: IPasswordResetProps) => {
  const [ login, setLogin ] = useState("");
  const { resetPassword, isLoading, authMessage, resetAuthMessage } = useAuth();
  const onLoginChange = (e: any) => {
    if (authMessage) { resetAuthMessage(); }
    setLogin(e.target.value);
  }
  const onSubmit = () => {
    if (login) {
      resetPassword(login)
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
            {authMessage === "auth/reset-success" ?
            <>
              <Typography
                variant="h5"
                align="center"
                mb={3}
              >
                <Dictionary
                  label="emailSent"
                />
              </Typography>
              <Box
                sx={{
                  width: 300,
                }}
                mb={3}
              >
                <Typography
                  variant="body2"
                  align="center"
                >
                  <Dictionary
                    label="emailSentDescription"
                    values={{ email: <b>{login}</b> }}
                  />
                </Typography>
              </Box>
              <Box
                mb={1}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  disableElevation
                  sx={{ width: 300 }}
                  href="/signin"
                >
                  <Dictionary label="backToSignIn"/>
                </Button>
              </Box>
            </> :
            <>
              <Typography
                variant="h5"
                align="center"
                mb={3}
              >
                <Dictionary
                  label="resetYourPassword"
                />
              </Typography>
              <Box
                mb={2}
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
                  <Dictionary label="reset"/>
                </Button>
              </Box>
              <Box
                mb={1}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  disableElevation
                  sx={{ width: 300 }}
                  href="/signin"
                >
                  <Dictionary label="backToSignIn"/>
                </Button>
              </Box>
            </>}
            {authMessage === "auth/user-not-found" ||
            authMessage === "auth/too-many-requests" ||
            authMessage === "auth/invalid-email" ?
            <Box mt={2}>
              <Alert
                severity="error"
                variant="filled"
              >
                Email not found or invalid or too many attempts
              </Alert>
            </Box> : null}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default injectIntl(PasswordReset);