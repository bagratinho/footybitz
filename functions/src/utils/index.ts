
export interface IMatchday {
  id: string;
  status: "hidden" | "active" | "in_progress" | "finished";
  kickOffDate: Date;
  name: string;
}

export interface IMatch {
  awayTeamAvatar: string;
  awayTeamGoals: number;
  awayTeamId: string;
  awayTeamName: string;
  competitionAvatar: string;
  competitionId: string;
  competitionName: string;
  homeTeamAvatar: string;
  homeTeamGoals: number;
  homeTeamId: string;
  homeTeamName: string;
  kickOffDate: Date;
  id: string;
}

interface IMatchScore {
  matchId: string;
  score: {
    0: number;
    1: number;
  }
}

export interface IPrediction {
  scores: IMatchScore[];
}

export const isPredictionValid = (
    matchday: any,
    matches: any[],
    prediction: any,
) => {
  return (
    matchday.status === "active" &&
    matches.length === prediction.scores.length &&
    matches.reduce((sum: boolean, i: IMatch) => {
      return sum === false ? false :
        prediction.scores.find((j: IMatchScore) =>
          j.matchId === i.id && isValidScore(j.score)) ?
        true : false;
    }, true)
  );
};

const isValidScore = (score: any) => {
  if (Object.keys(score).length === 2 &&
    typeof score[0] === "number" &&
    typeof score[1] === "number" &&
    score[0] >= 0 &&
    score[0] <= 10 &&
    score[1] >= 0 &&
    score[1] <= 10
  ) {
    return true;
  } else {
    return false;
  }
};
