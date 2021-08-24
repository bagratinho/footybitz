import * as React from "react";
import { Box, Typography } from "@material-ui/core";
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
    <Box>
      <Box
        height={60}
        display="flex"
        alignItems="center"
        pt={0}
        pb={0}
        pr={2}
        pl={2}
        borderColor="divider"
        borderLeft={0}
        borderRight={0}
        borderTop={0}
        border={1}
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
