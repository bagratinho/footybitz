import * as React from "react";
import { Box, FormControl, MenuItem, Select, Tab, Tabs, Typography, useTheme } from "@mui/material";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import TabPanel from "components/TabPanel";
import PredictionsList from "./PredictionsList";
import GamesList from "./GamesList";
import PageWrapper from "containers/PageWrapper";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { transparentize } from "utils"
import { getMatchdays } from "api/queries";

export interface IMatchdaysProps {
  className?: string;
}

export default (props: IMatchdaysProps) =>  {
  const { isLoading, isError, data, refetch } = useQuery(
    ["matchdays"],
    getMatchdays,
    {
      onSuccess: data => {
        if (selectedMatchdayId) { return; }
        setSelectedMatchdayId(data && data[0].id);
      }
    }
  );
  const matchdays = data || [];
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedMatchdayId, setSelectedMatchdayId] = useState(data ? data[0].id : undefined);


  const handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
    setSelectedTab(value);
  };

  const handleMatchdayChange = (event: any) => {
    setSelectedMatchdayId(event.target.value);
  };

  const getPredictionsCount = () => {
    return data?.find(i => i.id === selectedMatchdayId)?.predictions_count || 0;
  }

  const getMatchdaysControl = () => {
    const options = matchdays.map(i => {
      return (
        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
      );
    });
    return options.length ? (
      <FormControl variant="filled">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedMatchdayId}
          onChange={handleMatchdayChange}
        >
          {options}
        </Select>
      </FormControl>
    ) : null;
  }
  if (isLoading) {
    return (
      <PageWrapper>
        asd
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Box>
        <StickyBar position="top">
          <Box
            sx={{
              color: "divider",
              borderBottom: "1px solid",
              minHeight: "59px",
              background: transparentize(theme.palette.background.default, 0.8),
              backdropFilter: "blur(12px)",
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
              {getMatchdaysControl()}
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
            {selectedMatchdayId ?
            <GamesList
              matchdayId={selectedMatchdayId}
              refetchMatchdays={refetch}
            /> : null}
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <PredictionsList
              predictionsCount={getPredictionsCount()}
              matchdayId={selectedMatchdayId}
            />
          </TabPanel>
        </Box>
      </Box>
    </PageWrapper>
  );
}
