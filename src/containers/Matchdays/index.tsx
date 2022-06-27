import * as React from "react";
import { Box, FormControl, MenuItem, Select, Tab, Tabs, Typography } from "@mui/material";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import TabPanel from "components/TabPanel";
import PredictionsList from "./PredictionsList";
import GamesList from "./GamesList";
import PageWrapper from "containers/PageWrapper";

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
    <PageWrapper>
      <Box>
        <StickyBar position="top">
          <Box
            bgcolor="background.default"
            sx={{
              color: "divider",
              borderBottom: "1px solid",
              minHeight: "59px",
              // backdropFilter: "blur(12px)",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pt={1}
              pb={1}
              pr={2}
              pl={2}
              sx={{
                color: "divider",
                borderBottom: "1px solid",
                minHeight: "59px",
              }}
            >
              <Typography variant="h6" component="h2" color="text.primary">
                <Dictionary label="matchdays"/>
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
                <Tab label={<Dictionary label="matches"/>} />
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
    </PageWrapper>
  );
}
