import * as React from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@material-ui/core";
import Match from "containers/Match";

export interface IInterfaceProps {
  className?: string;
}

export default (props: IInterfaceProps) =>  {
  const [selectedMatchday, setSelectedMatchday] = React.useState(1);

  const handleMatchdayChange = (event: any) => {
    setSelectedMatchday(event.target.value);
  };
  return (
    <Box>
      <Box
        height={60}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pt={1}
        pb={1}
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
        <FormControl variant="filled">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedMatchday}
            onChange={handleMatchdayChange}
          >
            <MenuItem value={1}>Week 1</MenuItem>
            <MenuItem value={2}>Week 2</MenuItem>
            <MenuItem value={3}>Week 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Match/>
        <Match/>
        <Match/>
        <Match/>
        <Match/>
        <Match/>
        <Match/>
        <Match/>
        <Match/>
      </Box>
    </Box>
  );
}
