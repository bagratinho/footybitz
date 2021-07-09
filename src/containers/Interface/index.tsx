import * as React from "react";
import styled from "styles/styled-components";
import Box from "components/Box";
import { Grid } from "@material-ui/core";
import Container from "components/Container";
import { Sports, FormatListNumbered, EmojiEventsOutlined, HelpOutline } from "@material-ui/icons";
import Dictionary from "components/Dictionary";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,

} from "@material-ui/pickers";
import { NumberInput } from "./NumberInput";
import Match from "containers/Match";
import SidebarNavigation from "containers/SidebarNavigation";

export interface IInterfaceProps {
  className?: string;
}

export default (props: IInterfaceProps) =>  {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  return (
    <StyledContainer>
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
    </StyledContainer>
  );
}


const StyledContainer = styled(Box)`

`;