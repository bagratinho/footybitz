import * as React from "react";
import styled from "styles/styled-components";
import Box from "components/Box";
import { Grid } from "@material-ui/core";
import Container from "components/Container";
import { Sports, FormatListNumbered, EmojiEventsOutlined } from "@material-ui/icons";
import Dictionary from "components/Dictionary";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,

} from "@material-ui/pickers";
import { NumberInput } from "./NumberInput";
import Match from "containers/Match";

export interface IInterfaceProps {
  className?: string;
}

export default (props: IInterfaceProps) =>  {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  return (
    <>
      <StyledContainer>
        <Container>
          <Grid container alignItems="flex-start">
            <Grid item xs={3}>
              <div className="side-navigation">
                <div>
                  <Sports/><Dictionary label="matchdays"/>
                </div>
                <div>
                  <FormatListNumbered/><Dictionary label="results"/>
                </div>
                <div>
                  <EmojiEventsOutlined/><Dictionary label="standings"/>
                </div>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div className="main-panel">
                {/* <div className="filter-bar">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      id="date-picker-inline"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div> */}
                <div className="main-panel-header">
                  <div className="filter-bar">
                    Matchday
                  </div>
                </div>
                <div className="main-panel-inner">
                  <Match/>
                  <Match/>
                  <Match/>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>
        </Container>
      </StyledContainer>
    </>
  );
}


const StyledContainer = styled(Box)`
  & .side-navigation {
    overflow: hidden;
    background: #5e5c7b;;
    position: relative;
    z-index: 1;
    & > div {
      padding: 16px;
      font-size: 16px;
      color: #f4f6ff;
      font-weight: 400;
      display: flex;
      align-items: center;
      transition: ${props => props.theme.transition.default};
      cursor: pointer;
      text-transform: uppercase;
      & > svg {
        margin-right: 16px;
      }
      &:hover {
        background: #4f8a8b;
      }
    }
    & > div:not(:last-child) {
      border-bottom: solid 5px #4d4b62;
    }
  }

  & .main-panel {
    background: #3e3c4e;
    & .main-panel-header {
      background: #4f8a8b;
      color: #fff;
      background-color: #363544;
      padding: 8px 16px;
    }
    & .main-panel-inner {
      padding: 8px 16px;
    }
  }
`;