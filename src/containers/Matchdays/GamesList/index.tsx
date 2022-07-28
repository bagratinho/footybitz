import * as React from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import Match, { IMatchProps } from "containers/Match";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import { useEffect, useState } from "react";
import { db } from "firebaseInstance";
import { collection, doc, getDocs, onSnapshot, query, where, setDoc, orderBy, getDoc } from "firebase/firestore";
import { transparentize } from "utils"
import { useQueries } from "@tanstack/react-query";
import { useAuth } from "context/AuthContext";

export interface IGamesListProps {
  className?: string;
  matchdayId?: string;
}

export default (props: IGamesListProps) =>  {
  const [matchScores, setMatchScores] = useState<Object>({});
  const theme = useTheme();
  const { user } = useAuth();

  const getMatches = async () => {
    const matchesCollectionRef = collection(db, `matchdays/${props.matchdayId}/matches`);
    const q = query(
        matchesCollectionRef,
        where("matchdayId", "==", props.matchdayId),
        orderBy("kickOffDate", "asc")
      );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }

  const getPrediction = async () => {
    const predictionRef = doc(db, `matchdays/${props.matchdayId}/predictions/${user.uid}`);
    const prediction = await getDoc(predictionRef);
    return prediction.data();
  }

  const [ matchdayData, predictionData] = useQueries({
    queries: [
      { queryKey: ["matchday", props.matchdayId], queryFn: getMatches },
      { queryKey: ["prediction", props.matchdayId, user.uid], queryFn: getPrediction },
    ]
  });


  const onMatchScoreSet = (id: string, index: number, value: number) => {
    setMatchScores({
      ...matchScores,
      [id]: {
        ...matchScores[id],
        [index]: value,
      }
    })
  }

  const sendPrediction = async () => {
    const collectionName = `matchdays/${props.matchdayId}/predictions`;
    const newPredictionRef = doc(collection(db, collectionName), user.uid);
    const unsubscribe = onSnapshot(doc(db, collectionName, newPredictionRef.id), (doc) => {
      unsubscribe();
    });
    await setDoc(newPredictionRef, {
      scores: Object.keys(matchScores).map((matchId: string) => ({
        matchId,
        score: matchScores[matchId],
      })),
    }).catch(e => {
      console.log({e});
    });
  }

  const isLoading = matchdayData.isLoading || predictionData.isLoading;
  const matches = matchdayData.data;
  console.log(matchdayData, predictionData);
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
    if (!matches || !matches.length) {
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
    return matches.map((i: IMatchProps) => {
      const score = predictionData.data?.scores.find(j => j.matchId === i.id)?.score;
      return (
        <Match
          id={i.id}
          key={i.id}
          awayTeamAvatar={i.awayTeamAvatar}
          homeTeamAvatar={i.homeTeamAvatar}
          awayTeamName={i.awayTeamName}
          homeTeamName={i.homeTeamName}
          kickOffDate={i.kickOffDate}
          competitionName={i.competitionName}
          stage={i.stage}
          score={score || matchScores[i.id]}
          competitionAvatar={i.competitionAvatar}
          isSet={matchScores[i.id] ? Object.keys(matchScores[i.id]).length === 2 : false}
          onScoreSet={onMatchScoreSet}
          status={score ? "predicted" : "pending"}
        />
      );
    });
  };

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
      {matches && matches.length ? <StickyBar position="bottom">
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
            disabled={matchesWithPrediction.length !== matches.length}
            onClick={sendPrediction}
          >
            <Dictionary label="send"/>
          </Button>
        </Box>
      </StickyBar> : null}
    </>
  );
}
