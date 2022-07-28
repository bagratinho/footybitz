import * as React from "react";
import { Box, Chip, CircularProgress, Divider, List, ListItem, Paper, Typography } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import Dictionary from "components/Dictionary";
import { FormattedNumber } from "react-intl";
import { useEffect, useState } from "react";
import { collection, endAt, getDocs, limit, orderBy, query, startAfter, startAt } from "firebase/firestore";
import { db } from "firebaseInstance";

export interface IPredictionsListProps {
  className?: string;
  matchdayId?: string;
}

export default (props: IPredictionsListProps) =>  {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  let querySnapshot: any;
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
          <CircularProgress color="primary" />
        </Box>
      );
    }
    if (!predictions.length) {
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

  useEffect(() => {
    if (!props.matchdayId) { return; }
    const predictionsCollectionRef = collection(db, `matchdays/${props.matchdayId}/predictions`);
    const data = async (y: any) => {
      setIsLoading(true);
      const q = query(y, orderBy("scores", "asc"), startAt(page * 20 ), limit(20));
      querySnapshot = await getDocs(q);
      let preds: any[] = [];
      querySnapshot.forEach((doc) => {
        preds.push({
          id: doc.id,
          ...doc.data() as Object,
        });
      });
      console.log(preds);
      setPredictions([...predictions, ...preds]);
      setIsLoading(false);
    };
    data(predictionsCollectionRef);
  }, [props.matchdayId, page]);

  useEffect(() => {
    window.addEventListener("scroll", onScrollEnd);
    return () => {
      window.removeEventListener("scroll", onScrollEnd);
    };
  }, []);

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
                  value={1218}
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
