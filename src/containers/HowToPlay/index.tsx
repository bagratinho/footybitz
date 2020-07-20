import * as React from "react";
import styled from "styles/styled-components";
import { Typography, Grid } from "@material-ui/core";
import Container from "components/Container";


export interface IHowToPlayProps {
}

export default class HowToPlay extends React.PureComponent<IHowToPlayProps> {
  public render() {
    return (
      <StyledHeroBanner>
        <Container>
          <Typography component="h3">
            HOW TO PLAY
          </Typography>
        </Container>
        <Container>
          <Grid container alignItems="center">
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={8} container alignItems="center" justify="flex-end">

            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={8}>

            </Grid>
            <Grid item xs={4} container alignItems="center" justify="flex-end">

            </Grid>
          </Grid>
        </Container>
      </StyledHeroBanner>
    );
  }
}

const StyledHeroBanner = styled.section`
  & h3 {
  }
`;
