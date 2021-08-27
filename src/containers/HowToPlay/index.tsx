import * as React from "react";
import styled from "styles/styled-components";
import { Box, Typography } from "@material-ui/core";
import StickyBar from "components/StickyBar";

export interface IHowToPlayProps {
  className?: string;
}

export default (props: IHowToPlayProps) =>  {
  return (
    <Box>
      <StickyBar position="top">
        <Box
          display="flex"
          alignItems="center"
          minHeight={59}
          justifyContent="space-between"
          pt={1}
          pb={1}
          pr={2}
          pl={2}
          bgcolor="background.default"
          borderColor="divider"
          borderLeft={0}
          borderRight={0}
          borderTop={0}
          border={1}
        >
          <Typography variant="h6">
            How to play
          </Typography>
        </Box>
      </StickyBar>
      <Box
        pt="59px"
      >
        <Box
          p={2}
        >

  <Typography variant="subtitle2" gutterBottom>
  What is FootyPredictor?
  </Typography>
  <Typography variant="body2" gutterBottom color="textSecondary">
  Footy predictor is a online football results prediction game where you can win crypto rewards based on your result.
  </Typography>



  <Typography variant="subtitle2" gutterBottom>
  Who can participate?
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  Everybody who have a prepaid access ticket can participate.
  </Typography>


  <Typography variant="subtitle2" gutterBottom>
  How to buy access ticket and how much it costs?
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  Every matchday requires a prepaid access ticket which you need to buy by depositing bitcoins to your account. Price is always B0.0001.
  </Typography>

  <Typography variant="subtitle2" gutterBottom>
  How to deposit bitcoins?
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  Each account have a unique deposit hash which you can find in Deposit section of your account.
  </Typography>

  <Typography variant="subtitle2" gutterBottom>
  What is a matchday?
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  Matchday is a list of 10 highlighted matches usually played on the same weekend throughout major football leagues.
  </Typography>

  <Typography variant="subtitle2" gutterBottom>
  I bought a access ticket, whats next?
  </Typography>


  <Typography variant="body2" gutterBottom color="textSecondary">
  You need to fill in your predictions for each match of the matchday and submit it. After all the games in the matchday are finished,
  our system calculates the points of each participant and places them accordingly into the standings list. Participants with most points
  get rewards in crypto based on their ranking. Additionally the results are being summed up in seasonal rankings, a season long tournaments
  with a gran pri based on 38 matchdays of a season which is divided between top 3 of the players wit most points throughout the season.
  </Typography>

  <Typography variant="subtitle2" gutterBottom>
  How do you calculate points?
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  From each predicted match of the matchday you can get 0,1,2 or 3 points.
  </Typography>
  <Typography variant="body2" gutterBottom color="textSecondary">
  3 points for guessing correct outcome and score
  </Typography>
  <Typography variant="body2" gutterBottom color="textSecondary">
  2 for correct outcome and correct goal difference
  </Typography>
  <Typography variant="body2" gutterBottom color="textSecondary">
  1 for correct outcome and wrong goal difference
  </Typography>
  <Typography variant="body2" gutterBottom color="textSecondary">
  0 for wrong outcome
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  Suppose team A plays team B and you have predicted 1-0 win for team A.
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  If the match end with a score A 1-0 B you get 3 points for this match (correct guess of outcome and exact score)
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  If the match end with a score A 2-1 B or A 3-2 B you get 2 points for this match (correct guess of outcome and goal difference)
  </Typography>
  <Typography variant="body2" gutterBottom color="textSecondary">
  If the match end with a score A 2-0 B or A 4-1 B you get 1 point for this match (correct guess of outcome, goal difference is not guessed)
  </Typography>
  <Typography variant="body2" gutterBottom color="textSecondary">
  If the match end with a score A 0-0 B or A 1-2 B you get 0 points for this match (outcome guessed wrong)
  </Typography>

  <Typography variant="subtitle2" gutterBottom>
  What are the rewards?
  </Typography>

  <Typography variant="body2" gutterBottom color="textSecondary">
  The rewards are based on the prize pool of each matchday which is generated by access tickets bought by all participants.
  The prize pool is divided between top 25% of the participants where the highest positioned participant gets the highest reward.
  </Typography>

        </Box>
      </Box>
    </Box>

  );
}
