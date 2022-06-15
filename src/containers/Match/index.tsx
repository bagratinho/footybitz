import * as React from "react";
import styled from "styles/styled-components";
import NumberInput from "./NumberInput";
import Dictionary from "components/Dictionary";
import { Button } from "@material-ui/core";
import * as images from "./images";

export interface IMatchProps {
  // homeTeamLogo: string;
  // homeTeamName: string;
  // awayTeamLogo: string;
  // awayTeamName: string;
  // league: string;
  // kickOfDate: Date;
  score?: number[];
  // prediction?: number[];
  points?: number;
  onScoreSet?: (score: number[]) => void;
}

export default class Match extends React.PureComponent<IMatchProps> {
  public render() {
    const { props } = this;
    return (
      <StyledContainer>
        <div className="info">
          <img src={images.laLiga} alt=""/>
          <div>
            <span>La Liga Santander Round 2</span>
            <span>KO: 16.11.2021 14:00</span>
          </div>
        </div>
        <div className="details">
          <div className="label">
            {props.score ? <Dictionary label="finalScore"/> : <Dictionary label="yourPrediction"/>}
          </div>
          <div className="match">
            <div className="team">
              <img src="https://ssl.gstatic.com/onebox/media/sports/logos/paYnEE8hcrP96neHRNofhQ_96x96.png" alt=""/>
              Barcelona
            </div>
            <div className="outcome">
              {props.score ?
              <div className="result">
                <div>{props.score[0]}</div>
                -
                <div>{props.score[1]}</div>
              </div> :
              <div className="prediction">
                <NumberInput/>
                -
                <NumberInput/>
              </div>}
            </div>
            <div className="team">
              <img src="https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png" alt=""/>
              Real Madrid
            </div>
          </div>
        </div>
      </StyledContainer>
    );
  }
}


const StyledContainer = styled.div`
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
        color: ${props => props.theme.muiTheme.palette.text.primary};
      }
      & > span:last-child {
        font-size: 12px;
        color: ${props => props.theme.muiTheme.palette.text.secondary};
      }
    }
  }
  & .details {
    padding: 16px 8px;
    margin: 16px;
    border-radius: 5px;
    background: #1e2731;
    & .label {
      width: 100%;
      line-height: 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      color: ${props => props.theme.muiTheme.palette.text.secondary};
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
        font-size: 18px;
        font-weight: 500;
        justify-content: center;
        & > img {
          display: block;
          margin-bottom: 10px;
          height: 64px;
        }
      }
      & .outcome {
        display: flex;
        flex-direction: column;
        color: ${props => props.theme.muiTheme.palette.divider};
        & .result,
        & .prediction {
          display: flex;
          width: 150px;
          align-items: center;
          justify-content: space-between;
          color: ${props => props.theme.muiTheme.palette.text.primary};
          font-size: 30px;
          height: 130px;
          font-weight: 700;
        }
      }
    }

  }
`