import * as React from "react";
import NumberInput from "./NumberInput";
import Dictionary from "components/Dictionary";
import * as images from "./images";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Typography } from "@mui/material";
import { FormattedDate } from "react-intl";
import { EntityImage, EntityImagesMap } from "components/EntityImage";

export interface IMatchProps {
  id: string;
  homeTeamAvatar: string;
  homeTeamName: string;
  awayTeamAvatar: string;
  awayTeamName: string;
  kickOffDate: { seconds: number};
  competitionName: string;
  competitionAvatar: string;
  stage: string;
  score?: number[];
  isSet?: boolean;
  status: "finished" | "started" | "pending" | "predicted";
  onScoreSet?: (id: string, index: number, value: number) => void;
}

export default (props: IMatchProps) => {

  const changeScore = (index: number) => (value: number) => {
    if (!props.onScoreSet) { return; }
    props.onScoreSet(props.id, index, value);
  }
  return (
    <StyledContainer>
      <div className="info">
        <EntityImage
          id={props.competitionAvatar}
          size="large"
          type="competition"
          sx={{
            width: 42,
            height: 42,
            borderRadius: "4px",
            background: "#fff",
            mr: 1,
          }}
        />
        <div>
          <span>
            {props.competitionName}
            <Typography
              component="span"
              color="text.secondary"
              sx={{
                ml: 0.5,
                fontWeight: 700,
              }}
            >
              {props.stage}
            </Typography>
          </span>
          <span>
            <Dictionary
              label="ko"
              values={{
                date: (
                  <FormattedDate
                    value={props.kickOffDate.seconds * 1000}
                    // @ts-ignore:next-line
                    dateStyle={"full"}
                    timeStyle="short"
                  />
                )
              }}
            />
          </span>
        </div>
      </div>
      <div className="details">
        <div className="label">
          {props.status === "finished" ? <Dictionary label="finalScore"/> : null}
          {props.status === "predicted" || props.status === "pending" ? <Dictionary label="yourPrediction"/> : null}
          {props.status === "started" ? <Dictionary label="inProgress"/> : null}
        </div>
        <div className="match">
          <div className="team">
            <EntityImage
              id={props.homeTeamAvatar}
              size="large"
              type="team"
              sx={{
                mb: 1,
                width: 64,
                height: 64,
              }}
            />
            {props.homeTeamName}
          </div>
          <div className="outcome">
            {(props.status === "finished" || props.status === "predicted") && props.score ?
            <div className="result">
              <div>{props.score[0]}</div>
              -
              <div>{props.score[1]}</div>
            </div> :
            <div className="prediction">
              <NumberInput onChange={changeScore(0)} value={props.score && props.score[0]} isHighlighted={props.isSet}/>
              -
              <NumberInput onChange={changeScore(1)} value={props.score && props.score[1]} isHighlighted={props.isSet}/>
            </div>}
          </div>
          <div className="team">
            <EntityImage
              id={props.awayTeamAvatar}
              size="large"
              type="team"
              sx={{
                mb: 1,
                width: 64,
                height: 64,
              }}
            />
            {props.awayTeamName}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}


const StyledContainer = styled(Box)`
  color: #fff;
  border-bottom: solid 1px #38444d;
  user-select: none;
  & .info {
    padding: 16px 16px 0;
    display: flex;
    align-items: center;

    & > img {
      width: 42px;
      height: 42px;
      border-radius: 4px;
      background: #fff;
      margin-right: 12px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      & > span:first-child {
        font-weight: 700;
        color: ${props => props.theme.palette.text.primary};
      }
      & > span:last-child {
        font-size: 12px;
        color: ${props => props.theme.palette.text.secondary};
      }
    }
  }
  & .details {
    padding: 16px 8px;
    margin: 16px;
    border-radius: 5px;
    background: ${props => props.theme.palette.background.paper};
    & .label {
      width: 100%;
      line-height: 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      color: ${props => props.theme.palette.text.secondary};
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
    }
    & .match {
      justify-content: space-evenly;
      display: flex;
      & .team {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        justify-content: center;
      }
      & .outcome {
        display: flex;
        flex-direction: column;
        color: ${props => props.theme.palette.divider};
        font-family: "Kdam Thmor Pro";
        & .result > div{
          flex: 1;
          text-align: right;
          font-weight: 700;
          margin-right: 10px;
          &:last-child {
            text-align: left;
            margin-left: 10px;
            margin-right: 0;
          }
        }
        & .result,
        & .prediction {
          display: flex;
          width: 130px;
          align-items: center;
          justify-content: space-between;
          color: ${props => props.theme.palette.text.primary};
          font-size: 40px;
          height: 114px;
          font-weight: 700;
        }
      }
    }

  }
`