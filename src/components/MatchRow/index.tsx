import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { EntityImage } from "components/EntityImage";

export interface IMatchProps {
  homeTeamAvatar: string;
  homeTeamName: string;
  awayTeamAvatar: string;
  awayTeamName: string;
  score: number[];
}

export default (props: IMatchProps) => {
  return (
    <StyledContainer>
      <div className="details">
        <div className="match">
          <Box
            className="team"
            sx={{
              justifyContent: "flex-end",
            }}
          >
            {props.homeTeamName}
            <EntityImage
              id={props.homeTeamAvatar}
              size="large"
              type="team"
              sx={{
                ml: 0.5,
                width: 20,
                height: 20,
              }}
            />
          </Box>
          <div className="outcome">
            <div className="result">
              <div>{props.score !== undefined ? props.score[0] : null}</div>
              -
              <div>{props.score !== undefined ? props.score[1] : null}</div>
            </div>
          </div>
          <Box
            className="team"
            sx={{
              justifyContent: "flex-start",
            }}
          >
            <EntityImage
              id={props.awayTeamAvatar}
              size="large"
              type="team"
              sx={{
                mr: 0.5,
                width: 20,
                height: 20,
              }}
            />
            {props.awayTeamName}
          </Box>
        </div>
      </div>
    </StyledContainer>
  );
}


const StyledContainer = styled(Box)`
  color: ${props => props.theme.palette.secondary.main};
  user-select: none;
  &:nth-child(2n) .details {
    background: ${props => props.theme.palette.background.default};
  }
  & .details {
    padding: 4px 0;
    border-radius: 5px;
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
        flex-direction: row;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
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
        & .result {
          display: flex;
          width: 100px;
          align-items: center;
          justify-content: space-between;
          color: ${props => props.theme.palette.text.primary};
          font-size: 20px;
          font-weight: 700;
        }
      }
    }

  }
`