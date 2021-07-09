import * as React from "react";
import styled from "styles/styled-components";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { Container, Typography } from "@material-ui/core";
import { Settings} from "@material-ui/icons";
import Box from "components/Box";
import Dictionary from "components/Dictionary";
export interface IFooterProps {
  className?: string;
}

export interface IFooterState {

}

class Footer extends React.Component<IFooterProps, IFooterState> {
  constructor(props: IFooterProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <StyledFooter
        className={this.props.className}
        padding={["l", null]}
      >
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4} alignItems="center">

            </Grid>
            <Grid item xs={8} container alignItems="center" justify="flex-end">



            </Grid>
          </Grid>
        </Container>
      </StyledFooter>
    );
  }
}

const StyledFooter = styled(Box)`
  background: #363544;
  text-transform: uppercase;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  color: #4f8a8b;
`;

export default Footer;
