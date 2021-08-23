import * as React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
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
    <Box>
      <Box
        height={60}
        display="flex"
        alignItems="center"
        pt={0}
        pb={0}
        pr={2}
        pl={2}
      >
        <Typography variant="h6">
          Matchday
        </Typography>
      </Box>
      <Box>
        <Match/>
        <Match/>
        <Match/>
      </Box>
    </Box>
  );
}
