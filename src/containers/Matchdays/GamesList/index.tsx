import * as React from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import Match, { IMatchProps } from "containers/Match";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import { useEffect, useState } from "react";
import { db } from "firebaseInstance";
import { collection, getDocs, query, where } from "firebase/firestore";
import { transparentize } from "utils"

export interface IGamesListProps {
  className?: string;
  matchdayId?: string;
}

export default (props: IGamesListProps) =>  {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [matchScores, setMatchScores] = useState<Object>({});
  const theme = useTheme();

  const onMatchScoreSet = (id: string, index: number, value: number) => {
    setMatchScores({
      ...matchScores,
      [id]: {
        ...matchScores[id],
        [index]: value,
      }
    })
  }

  const renderMatches = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            height: 300,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      );
    }
    if (!matches.length) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            height: 300,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <Dictionary label="nothingToShow"/>
          </Typography>
        </Box>
      );
    }
    return matches.map((i: IMatchProps) => (
      <Match
        id={i.id}
        key={i.id}
        awayTeamAvatar={i.awayTeamAvatar}
        homeTeamAvatar={i.homeTeamAvatar}
        awayTeamName={i.awayTeamName}
        homeTeamName={i.homeTeamName}
        kickOffDate={i.kickOffDate}
        competitionName={i.competitionName}
        competitionAvatar={i.competitionAvatar}
        onScoreSet={onMatchScoreSet}
      />
    ));
  };

  useEffect(() => {
    if (!props.matchdayId) { return; }
    const matchesCollectionRef = collection(db, "matches");
    const data = async (y: any) => {
      setIsLoading(true);
      const q = query(y, where("matchdayId", "==", props.matchdayId));
      const querySnapshot = await getDocs(q);
      let mtchs: any[] = [];
      querySnapshot.forEach((doc) => {
        mtchs.push({
          ...doc.data() as Object,
        });
      });
      setMatches(mtchs);
      setIsLoading(false);
    };
    data(matchesCollectionRef);
  }, [props.matchdayId]);

  const matchesWithPrediction = Object.keys(matchScores).reduce((sum: any[], item: string) => {
    return Object.keys(matchScores[item]).length === 2 ? [...sum, matchScores[item]] : sum
  }, []);
  return (
    <>
      <Box
        pb="74px"
      >
        {renderMatches()}
      </Box>
      {matches.length ? <StickyBar position="bottom">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pt={2}
          pb={2}
          pr={2}
          pl={2}
          borderColor="divider"
          bgcolor="background.default"
          borderLeft={0}
          borderRight={0}
          borderBottom={0}
          borderTop={1}
          sx={{
            background: transparentize(theme.palette.background.default, 0.8),
            backdropFilter: "blur(12px)",
          }}
        >
          <Typography variant="h6" component="h2" color="text.primary">
            {matchesWithPrediction.length}/{matches.length}
          </Typography>
          <Button
            size="large"
            color="primary"
            variant="contained"
            disableElevation
          >
            <Dictionary label="send"/>
          </Button>
        </Box>
      </StickyBar> : null}
    </>
  );
}
