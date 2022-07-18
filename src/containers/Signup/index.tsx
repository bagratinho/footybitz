import { Alert, Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import Dictionary from "components/Dictionary";
import messages from "components/Dictionary/messages";
import { useAuth } from "context/AuthContext";
import * as React from "react";
import { useState } from "react";
import { injectIntl } from "react-intl";

interface ISignupProps {
  intl?: any,
}

const Signup = (props: ISignupProps) => {
  const [ login, setLogin ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordRepeat, setPasswordRepeat ] = useState("");
  const [ isPasswordsMismatch, setIsPasswordsMismatch ] = useState(false);
  const { signUp, isLoading, authMessage, resetAuthMessage } = useAuth();

  const onLoginChange = (e: any) => {
    if (authMessage) { resetAuthMessage(); }
    setLogin(e.target.value);
  }

  const onPasswordChange = (e: any) => {
    if (authMessage) { resetAuthMessage(); }
    if (isPasswordsMismatch) { setIsPasswordsMismatch(false); }
    setPassword(e.target.value);
  }

  const onPasswordRepeatChange = (e: any) => {
    if (authMessage) { resetAuthMessage(); }
    if (isPasswordsMismatch) { setIsPasswordsMismatch(false); }
    setPasswordRepeat(e.target.value);
  }

  const onSubmit = () => {
    if (login && password && passwordRepeat) {
      if (password === passwordRepeat) {
        signUp(login, password);
      } else {
        setIsPasswordsMismatch(true);
      }
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
              <Dictionary label="signUpTo"/>
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
              mb={1}
            >
              <TextField
                size="medium"
                placeholder={props.intl.formatMessage(messages.password)}
                variant="outlined"
                error={isPasswordsMismatch}
                value={password}
                onChange={onPasswordChange}
                type="password"
                sx={{ width: 300 }}
              />
            </Box>
            <Box
              mb={2}
            >
              <TextField
                size="medium"
                placeholder={props.intl.formatMessage(messages.repeatPassword)}
                variant="outlined"
                error={isPasswordsMismatch}
                value={passwordRepeat}
                onChange={onPasswordRepeatChange}
                type="password"
                sx={{ width: 300 }}
              />
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
                <Dictionary label="signUp"/>
              </Button>
            </Box>
            {isPasswordsMismatch ?
            <Box
              mb={2}
            >
              <Alert
                severity="error"
                variant="filled"
              >
                <Dictionary
                  label="passwordsMismatch"
                />
              </Alert>
            </Box> : null}
            {authMessage === "auth/email-already-in-use" ?
            <Box mb={2}>
              <Alert
                severity="error"
                variant="filled"
              >
                <Dictionary
                  label="emailAlreadyInUse"
                />
              </Alert>
            </Box> : null}
            {authMessage === "auth/weak-password" ?
            <Box mb={2}>
              <Alert
                severity="error"
                variant="filled"
              >
                <Dictionary
                  label="passwordIsTooWeak"
                />
              </Alert>
            </Box> : null}
            <Box
              sx={{
                width: 300
              }}
            >
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
              >
                <Dictionary
                  label="alreadyHaveAnAccount"
                  values={{
                    link: (
                      <Link
                        underline="none"
                        href="/signin"
                        variant="body2"
                        color="secondary"
                      >
                        <Dictionary
                          label="signIn"
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

export default injectIntl(Signup);