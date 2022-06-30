import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import Match, { IMatchProps } from "containers/Match";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";

export interface IGamesListProps {
  className?: string;
  matches?: IMatchProps[];
  matchdayId?: string;
}

export default (props: IGamesListProps) =>  {
  const getMatches = () => {
    if (!props.matches) { return null; }
    const matches = props.matches.map((i: IMatchProps) => {
      <Match
        id={i.id}
        key={i.id}
        awayTeamLogo={i.awayTeamLogo}
        homeTeamLogo={i.homeTeamLogo}
        awayTeamName={i.awayTeamName}
        homeTeamName={i.homeTeamLogo}
        kickOffDate={i.kickOffDate}
        competition={i.competition}
        onScoreSet={() => null}
      />
    });
    return matches;
  };

  return (
    <>
      <Box
        pb="74px"
      >
        {getMatches()}
      </Box>
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
        >
          <Typography variant="h6" component="h2" color="text.primary">
            0/10
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
      </StickyBar>
    </>
  );
}
