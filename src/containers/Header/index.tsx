import * as React from "react";
import styled from "styles/styled-components";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Settings} from "@material-ui/icons";
import Container from "components/Container";
import Box from "components/Box";
import Dictionary from "components/Dictionary";
import logo from "./logo.png";
import logo1 from "./logo1.png";
import { FirebaseContext } from "components/Firebase";
export interface IHeaderProps {
  className?: string;
}

export interface IHeaderState {

}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <StyledHeader
        className={this.props.className}
        padding={["l", null]}
      >
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4} alignItems="center">
              <Typography component="h1">
                <img src={logo} />
              </Typography>
            </Grid>
            <Grid item xs={8} container alignItems="center" justify="flex-end">
              <IconButton
                size="medium"
                color="primary"
              >
                <Settings />
              </IconButton>
              <div className="authentication">
                <FirebaseContext.Consumer>
                  {(firebase: any) => (
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      onClick={() => firebase.signInWithEmailAndPassword("bagratinho@gmail.com", "br224728")}
                    >
                      <Dictionary label="signIn"/>
                    </Button>
                  )}
                </FirebaseContext.Consumer>
                <span>or</span>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  disableElevation
                >
                  <Dictionary label="signUp"/>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </StyledHeader>
    );
  }
}

const StyledHeader = styled(Box)`
  background: #fbd46d;
  text-transform: uppercase;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  color: #4f8a8b;
  & img {
    height: 30px;
    display: block;
  }
  ul.menu {
    margin: 0;
    padding: 0;
    display: flex;
    li {
      display: block;
      margin-right: 20px;
    }
  }
  .authentication {
    & > * {
      margin-left: 20px;
    }
  }
`;

export default Header;
