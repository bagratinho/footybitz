import * as React from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import Match, { IMatchProps } from "containers/Match";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import { useState } from "react";
import { transparentize } from "utils"
import { useMutation, useQueries } from "@tanstack/react-query";
import { useAuth } from "context/AuthContext";
import { getMatches, getPrediction } from "api/queries";
import NoResult from "components/NoResult";
import Loading from "components/Loading";
import { PredictionConfirmation } from "./PredictionConfirmation";
import MatchRow from "components/MatchRow";
import { sendPrediction } from "api/mutations";

export interface IGamesListProps {
  className?: string;
  matchdayId: string;
  refetchMatchdays: () => void;
}

export default (props: IGamesListProps) =>  {
  const theme = useTheme();
  const { user } = useAuth();
  const [matchScores, setMatchScores] = useState<Object>({});
  const [isPredictionConfirmationOpen, setIsPredictionConfirmationOpen] = useState<boolean>(false);
  const sendPredictionMutation = useMutation(sendPrediction, {
    onSuccess: () => {
      props.refetchMatchdays();
      predictionData.refetch();
      setIsPredictionConfirmationOpen(false)
    },
  });

  const [ matchdayData, predictionData] = useQueries({
    queries: [
      {
        queryKey: ["matchday", props.matchdayId],
        queryFn: () => getMatches(props.matchdayId),
      },
      {
        queryKey: ["prediction", props.matchdayId, user.uid],
        queryFn: () => getPrediction(props.matchdayId, user.uid),
        keepPreviousData: true,
      }
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

  const onPredictionConfirm = async () => {
    sendPredictionMutation.mutate({
      matchdayId: props.matchdayId,
      uid: user.uid,
      matchScores,
    })
  }

  const isLoading = matchdayData.isLoading;
  const matches = matchdayData.data;
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
          <Loading/>
        </Box>
      );
    }
    if (!matches || !matches.length) {
      return (
        <NoResult/>
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

  const renderPrediction = () => {
    if (isLoading || !matchScores) { return null; }

    return matches!.map(i => {
      return (
        <MatchRow
          key={i.id}
          score={matchScores[i.id]}
          homeTeamName={i.homeTeamName}
          homeTeamAvatar={i.homeTeamAvatar}
          awayTeamName={i.awayTeamName}
          awayTeamAvatar={i.awayTeamAvatar}
        />
      );
    })
  }

  const onPredictionConfirmationClose = () => {
    setIsPredictionConfirmationOpen(false);
  }

  const onPredictionConfirmationOpen = () => {
    setIsPredictionConfirmationOpen(true);
  }

  const toggleEditMode = () => {
    predictionData.remove();
  }

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
      {matches && matches.length ?
      <StickyBar position="bottom">
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
            disabled={predictionData.data ? false : matchesWithPrediction.length !== matches.length}
            onClick={predictionData.data ? toggleEditMode : onPredictionConfirmationOpen}
          >
            <Dictionary label="send"/>
          </Button>
        </Box>
      </StickyBar> : null}
      <PredictionConfirmation
        onClose={onPredictionConfirmationClose}
        onSave={onPredictionConfirm}
        isOpen={isPredictionConfirmationOpen}
        isLoading={sendPredictionMutation.isLoading}
      >
        {renderPrediction()}
      </PredictionConfirmation>
    </>
  );
}
