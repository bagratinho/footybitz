import * as React from "react";
import { Box, Chip, CircularProgress, Divider, List, ListItem, Paper, Typography } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import Dictionary from "components/Dictionary";
import { FormattedNumber } from "react-intl";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPredictions } from "api/queries";
import NoResult from "components/NoResult";
import Loading from "components/Loading";

export interface IPredictionsListProps {
  className?: string;
  matchdayId: string;
  predictionsCount: number;
}

export default (props: IPredictionsListProps) =>  {
  const [page, setPage] = useState<number>(0);
  const { isLoading, isError, data } = useQuery(
    ["predictions"],
    () => getPredictions(props.matchdayId, page),
  );
  const predictions = data || [];
  const renderPredictions = () => {
    if (isLoading && !predictions.length) {
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
    if (!predictions.length) {
      return (
        <NoResult/>
      );
    }
    const predictionsList = predictions.map((i: any) => (
      <React.Fragment key={i.id}>
        <Divider />
        <ListItem disableRipple button>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Typography variant="body1" color="textSecondary">ID: {i.id}</Typography>
            <Chip
              icon={<FaceIcon />}
              label="Footybitz user"
              color="primary"
            />
          </Box>
        </ListItem>
      </React.Fragment>
    ));
    return (
      <List component="nav" >
        {predictionsList}
      </List>
    );
  };

  const onScrollEnd = () => {
    const doc = document.documentElement;
    const isScrollEnded = (window.innerHeight + doc.scrollTop === doc.scrollHeight);
    if (isScrollEnded) {
      setPage((p: number) => p + 1);
    }
  }

  return (
    <Box>
      <Box
        p={2}
        display="flex"
      >
        <Box
          flex={1}
          marginRight={2}
        >
          <Paper variant="outlined">
            <Box
              p={2}
            >
              <Typography variant="h6" component="h2" color="success.main">
                ₮
                <FormattedNumber
                  value={1800.05}
                  style="decimal"
                />
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <Dictionary label="currentPrizePool"/>
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box
          flex={1}
        >
          <Paper variant="outlined">
            <Box
              p={2}
            >
              <Typography variant="h6" component="h2" color="textPrimary">
                <FormattedNumber
                  value={props.predictionsCount}
                />
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <Dictionary label="numberOfParticipants"/>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box>
        {renderPredictions()}
      </Box>
    </Box>
  );
}
