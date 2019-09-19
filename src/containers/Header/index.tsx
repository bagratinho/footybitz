import * as React from 'react';
import styled from 'styles/styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
          <Grid container>
            <Grid item xs={4}>
              <h1>
                <a href="#">
                  <img src="" alt=""/>
                </a>
              </h1>
            </Grid>
            <Grid item xs={8}>
              <div className="rest">
                <nav>
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
                </nav>
                <div className="authentication">
                  <Button>sign in</Button>
                  <span>or</span>
                  <Button>sign up</Button>
                </div>
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
  .container {
    margin: 0 auto;
    width: 1200px;
  }
  .rest {
    display: flex;
    ul.menu {
      margin: 0;
      padding: 0;
      display: flex;
      li {
        display: block;
      }
    }
  }
`;

export default StyledHeader;
