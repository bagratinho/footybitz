import * as React from "react";
import { Box, FormControl, MenuItem, Select, Tab, Tabs, Typography } from "@material-ui/core";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import TabPanel from "components/TabPanel";
import PredictionsList from "./PredictionsList";
import GamesList from "./GamesList";

export interface IMatchdaysProps {
  className?: string;
}

export default (props: IMatchdaysProps) =>  {
  const [selectedMatchday, setSelectedMatchday] = React.useState(1);
  const handleMatchdayChange = (event: any) => {
    setSelectedMatchday(event.target.value);
  };
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
    setSelectedTab(value);
  };
  return (
    <Box>
      <StickyBar position="top">
        <Box
          borderColor="divider"
          borderLeft={0}
          borderRight={0}
          borderTop={0}
          border={1}
          minHeight={59}
          bgcolor="background.default"
        >
          <Box
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
            <Tabs
              textColor="primary"
              indicatorColor="primary"
              value={selectedTab}
              onChange={handleTabChange}
              action={(ref: any) => ref && ref.updateIndicator()}
            >
              <Tab label={<Dictionary label="games"/>} />
              <Tab label={<Dictionary label="predictions"/>} />
            </Tabs>
          </Box>
        </Box>
      </StickyBar>
      <Box
        pt="108px"
      >
        <TabPanel value={selectedTab} index={0}>
          <GamesList/>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <PredictionsList/>
        </TabPanel>
      </Box>
    </Box>
  );
}
