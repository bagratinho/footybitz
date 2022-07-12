import * as React from "react";
import { Box, FormControl, MenuItem, Select, Tab, Tabs, Typography, useTheme } from "@mui/material";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import TabPanel from "components/TabPanel";
import PredictionsList from "./PredictionsList";
import GamesList from "./GamesList";
import PageWrapper from "containers/PageWrapper";
import { useEffect, useState } from "react";
import { db } from "firebaseInstance";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { transparentize } from "utils"

export interface IMatchdaysProps {
  className?: string;
}

export default (props: IMatchdaysProps) =>  {
  const [selectedMatchday, setSelectedMatchday] = useState<string | undefined>();
  const [selectedTab, setSelectedTab] = useState(0);
  const [matchdays, setMatchdays] = useState<any[]>([]);
  const theme = useTheme();

  const handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
    setSelectedTab(value);
  };

  const handleMatchdayChange = (event: any) => {
    setSelectedMatchday(event.target.value);
  };

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
          value={selectedMatchday}
          onChange={handleMatchdayChange}
        >
          {options}
        </Select>
      </FormControl>
    ) : null;
  }

  useEffect(() => {
    const matchdaysCollectionRef = collection(db, "matchdays");
    const data = async (y: any) => {
      const q = query(y,
        where("kickOffDate", ">", new Date(Date.now())),
        where("isArchived", "==", false),
        where("isFinished", "==", false),
        orderBy("kickOffDate", "asc"),
      );
      const querySnapshot = await getDocs(q);
      let mds: any[] = [];
      querySnapshot.forEach((doc) => {
        mds.push({
          ...doc.data() as Object,
        });
      });
      setSelectedMatchday(mds[0].id);
      setMatchdays(mds);
    };
    data(matchdaysCollectionRef);
  }, []);

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
            <GamesList
              matchdayId={selectedMatchday}
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <PredictionsList/>
          </TabPanel>
        </Box>
      </Box>
    </PageWrapper>
  );
}
