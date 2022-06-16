import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { Box, Container, styled, Typography } from "@mui/material";
import { Settings} from "@mui/icons-material";
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
            <Grid item xs={8} container alignItems="center">



            </Grid>
          </Grid>
        </Container>
      </StyledFooter>
    );
  }
}

const StyledFooter = styled(Box)`
  background: rgb(56, 68, 77);
  text-transform: uppercase;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  color: #4f8a8b;
`;

export default Footer;
