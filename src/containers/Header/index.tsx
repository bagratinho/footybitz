import * as React from 'react';
import styled from 'styles/styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

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
      <header className={this.props.className}>
        <div className="container">
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography component="h1" >
                <a href="#">
                  FOOTY PREDICTOR
                </a>
              </Typography>
            </Grid>
            <Grid item xs={8} container alignItems="center" justify="flex-end">
              <ul className="menu">
                <li>
                  <a href="">how to play</a>
                </li>
                <li>
                  <a href="">leaderboard</a>
                </li>
                <li>
                  <a href="">rules</a>
                </li>
              </ul>
              <div className="authentication">
                <Button>sign in</Button>
                <span>or</span>
                <Button>sign up</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </header>
    );
  }
}

const StyledHeader = styled(Header)`
  background: #ccc;
  padding: 10px 0;
  text-transform: uppercase;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  & a {
    color: #333;
    text-decoration: none;
  }
  .container {
    margin: 0 auto;
    width: 1200px;
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

export default StyledHeader;
